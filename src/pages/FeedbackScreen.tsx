import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import PageLayout from '@/components/PageLayout';
import fileAddIcon from '@/assets/file-add.svg';
import { useToast } from '@/components/ui/use-toast';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Array<{ file: File; preview: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const user = {
    name: 'Dhiren Devganiya',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your feedback before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFeedback('');
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      setSelectedFiles([]);

      toast({
        title: 'Feedback Submitted',
        description: "Thank you for your feedback! We've received it successfully.",
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Feedback / Suggestions">
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto flex h-full w-full max-w-md flex-1 flex-col bg-gradient-to-r from-[#F7F7F7] to-white to-50%"
      >
        <div className="flex-grow-1 scrollbar-hide mb-[76px] flex flex-1 flex-col overflow-y-auto rounded-br-[22px] bg-[#F7F7F7]">
          <div className="m-4 rounded-2xl bg-white p-1">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-[46px] rounded-[12px] border border-[#E5EEE3]">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <p className="font-base font-normal text-[#212121]">{user.name}</p>
            </div>
          </div>

          <div className="h-[4px] bg-white"></div>

          <div className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              <div className="space-y-2.5">
                <label htmlFor="feedback" className="block text-[14px] font-normal leading-[10px] text-[#212121]">
                  Add a feedback / suggestion
                </label>
                <textarea
                  id="feedback"
                  placeholder="Drop your feedback and suggestion"
                  className="min-h-[120px] w-full resize-none rounded-[8px] border border-[#2121211A] bg-white p-[10px] text-[14px] font-normal leading-[20px] text-[#4D4D4D] outline-none placeholder:text-[12px] placeholder:font-light placeholder:text-[#777777]"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2.5">
                <label className="block text-[14px] font-normal leading-[10px] text-[#212121]">Upload media</label>

                {selectedFiles.length < 5 && (
                  <label
                    htmlFor="media-upload"
                    className="flex min-h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-[#2121211A] p-5"
                  >
                    {selectedFiles.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2.5">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="relative aspect-square overflow-hidden rounded-[6px]">
                            {file.file.type.startsWith('image/') ? (
                              <img src={file.preview} alt={`Preview ${index}`} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                <span className="text-xs text-gray-500">Video</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-[#21212199]">
                        <img src={fileAddIcon} alt="Upload" className="size-[26px]" />
                        <span className="text-[12px] font-light leading-[8px]">{selectedFiles.length > 0 ? 'Add more' : 'Upload photo & video'}</span>
                      </div>
                    )}
                    <input id="media-upload" type="file" className="hidden" accept="image/*,video/*" multiple onChange={handleFileChange} />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow-1 absolute bottom-0 left-0 right-0 flex w-full flex-col gap-3 rounded-tl-[22px] bg-[#FFFFFF] p-4">
          <button
            type="submit"
            className="h-11 w-full rounded-[8px] border border-[#38963B] bg-[#38963B] text-center text-[16px] font-medium leading-[11px] text-white transition-colors hover:bg-[#388E3C]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </PageLayout>
  );
};

export default FeedbackScreen;
