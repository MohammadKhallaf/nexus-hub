import supabase from '@app/configs/supabase';

export const uploadImageToChat = async (chatId: string, file: File) => {
  const fileName = `${Date.now()}_${file.name}`;
  const supabaseFilePath = `chats/${chatId}/${fileName}`;
  const { error } = await supabase.storage
    .from('message_attachments')
    .upload(supabaseFilePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

  // Get public URL of the uploaded image
  const {
    data: { publicUrl },
  } = supabase.storage
    .from('message_attachments') // Replace with your bucket name
    .getPublicUrl(supabaseFilePath);

  return publicUrl;
};

export default {};
