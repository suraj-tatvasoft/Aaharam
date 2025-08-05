import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PageLayout from "@/components/PageLayout";
import fileAddIcon from "@/assets/file-add.svg";

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Array<{file: File, preview: string}>>([]);

  const user = {
    name: "Dhiren Devganiya",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    URL.revokeObjectURL(newFiles[index].preview); // Clean up the object URL
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission with all files
    console.log({ 
      feedback, 
      files: selectedFiles.map(f => f.file) 
    });
    // Add your submission logic here
  };

  return (
    <PageLayout title="Feedback / Suggestions">
      <div className="flex flex-col p-4 max-w-md mx-auto w-full h-[calc(100vh-120px)] relative">
        <div className="space-y-6 pb-24">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Feedback Textarea */}
          <div className="space-y-1">
            <label htmlFor="feedback" className="block text-sm font-semibold text-gray-800">
              Add a feedback / suggestion
            </label>
            <Textarea
              id="feedback"
              placeholder="Type your feedback or suggestion here..."
              className="min-h-[120px] resize-none bg-white"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          {/* Upload Media */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-800">
              Upload media
            </label>
            
            {/* Selected Files Grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  {file.file.type.startsWith('image/') ? (
                    <img 
                      src={file.preview} 
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Video</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 hover:bg-black/90"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            {selectedFiles.length < 5 && (
              <label
                htmlFor="media-upload"
                className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors h-32"
              >
                <div className="flex flex-col gap-4 items-center text-gray-500">
                  <img src={fileAddIcon} alt="Upload" className="h-6 w-6 mr-2" />
                  <span className="text-sm">
                    {selectedFiles.length > 0 ? 'Add more' : 'Upload photo & video'}
                  </span>
                </div>
                <input
                  id="media-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            )}
            
            {selectedFiles.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected • Max 5 files
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-[calc(100%-2rem)] h-12 bg-[#43A047] hover:bg-[#388E3C] text-white text-base font-medium rounded-xl shadow-sm fixed bottom-4 left-1/2 -translate-x-1/2 max-w-md"
          >
            Submit
          </Button>
        </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default FeedbackScreen;
