import { useToast } from '@/hooks/use-toast';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="relative block bg-[#F0FFEF] rounded-[16px] pt-[14px] pb-[12px] px-[14px] border-0" style={{ boxShadow:'0px 3px 0px #38963B, 0px 6px 12px rgba(0, 20, 62, 0.16)'}}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {title && <div className="text-[14px] font-medium leading-normal text-[#212121]">{title}</div>}
                {description && <div className="text-[14px] font-light leading-normal text-[#666666]">{description}</div>}
              </div>
              <button
                onClick={() => dismiss(id)}
                className="flex-shrink-0 text-[#999999] hover:text-[#666666] transition-colors"
                aria-label="Close"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7L7 1M7 7L1 1" stroke="#212121" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
