"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UpdateMemberSchema } from "@/entities/member";
import { fetchCurrentMember, updateMember } from "@/gateways/member";
import { db } from "@/lib/drizzle/db";
import { members } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";

export const updateProfile = async (formData: FormData) => {
	const member = await fetchCurrentMember();

	if (!member) {
		return { error: "Not authenticated" };
	}

	const name = formData.get("name") as string;

	const validationResult = UpdateMemberSchema.safeParse({ name });
	if (!validationResult.success) {
		return { error: validationResult.error.issues[0].message };
	}

	const result = await updateMember(member.id, validationResult.data);
	if (result.success) {
		revalidatePath("/profile");
	}
	return result;
};

export const uploadAvatar = async (formData: FormData) => {
	const member = await fetchCurrentMember();

	if (!member) {
		return { error: "Not authenticated" };
	}

	const file = formData.get("avatar") as File;
	if (!file || file.size === 0) {
		return { error: "No file selected" };
	}

	// Supabase Storageにアップロード
	const supabase = await createClient();
	const fileExt = file.name.split(".").pop();
	const fileName = `${member.id}/avatar.${fileExt}`;

	const { error: uploadError } = await supabase.storage
		.from("icons")
		.upload(fileName, file, {
			upsert: true,
		});

	if (uploadError) {
		console.error("Failed to upload avatar:", uploadError);
		return { error: "Failed to upload avatar" };
	}

	const {
		data: { publicUrl },
	} = supabase.storage.from("icons").getPublicUrl(fileName);

	// DBを更新
	try {
		await db
			.update(members)
			.set({
				iconUrl: publicUrl,
				updatedAt: new Date(),
			})
			.where(eq(members.id, member.id));

		revalidatePath("/profile");
		return { success: true, iconUrl: publicUrl };
	} catch (error) {
		console.error("Failed to update avatar in DB:", error);
		return { error: "Failed to update avatar" };
	}
};
