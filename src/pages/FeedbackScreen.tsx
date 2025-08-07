import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    URL.revokeObjectURL(newFiles[index].preview); // Clean up the object URL
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your feedback before submitting.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear form
      setFeedback('');
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      setSelectedFiles([]);

      // Show success toast
      toast({
        title: 'Feedback Submitted',
        description: "Thank you for your feedback! We've received it successfully."
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Feedback / Suggestions">
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col bg-gray-100 p-4">
        <div className="flex flex-1 flex-col space-y-6">
          {/* User Profile Card */}
          <div className="rounded-2xl bg-white p-2 shadow-sm">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-2 h-[2px] bg-white"></div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-4">
            <div className="flex-1">
              {/* Feedback Textarea */}
              <div className="space-y-1">
                <label htmlFor="feedback" className="block text-sm font-semibold text-gray-800">
                  Add a feedback / suggestion
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Drop your feedback and suggestion"
                  className="min-h-[120px] resize-none bg-white"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>

              {/* Upload Media */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-800">Upload media</label>

                {/* Selected Files Grid */}
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                      {file.file.type.startsWith('image/') ? (
                        <img src={file.preview} alt={`Preview ${index}`} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <span className="text-xs text-gray-500">Video</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute right-1 top-1 rounded-full bg-black/70 p-0.5 text-white hover:bg-black/90"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload Button */}
                {selectedFiles.length < 5 && (
                  <label
                    htmlFor="media-upload"
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center gap-4 text-gray-500">
                      <img src={fileAddIcon} alt="Upload" className="mr-2 h-6 w-6" />
                      <span className="text-sm">{selectedFiles.length > 0 ? 'Add more' : 'Upload photo & video'}</span>
                    </div>
                    <input id="media-upload" type="file" className="hidden" accept="image/*,video/*" multiple onChange={handleFileChange} />
                  </label>
                )}

                {selectedFiles.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected • Max 5 files
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#43A047] text-base font-medium text-white hover:bg-[#388E3C]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default FeedbackScreen;
