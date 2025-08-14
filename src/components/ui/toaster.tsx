import { useToast } from '@/hooks/use-toast';
import mainLogo from '@/assets/main-logo.svg';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="block rounded-[14px] bg-[#e3e2e3] p-3 bg-blend-luminosity shadow-none backdrop-blur-[102px]">
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img src={mainLogo} alt="Aaharam Logo" className="h-[22px] w-[22px] rounded-[6px] bg-white" />
                  <div className="text-[16px] text-[#969895]">Aaharam</div>
                </div>
                <div className="letter-spacing-[-1%] text-[16px] font-medium leading-[17px] tracking-[0] text-[#828382]">now</div>
              </div>
              <div className="">
                {title && <div className="mb-1 text-[14px] font-normal leading-[17px] text-[#2d2c2c]">{title}</div>}
                {description && <div className="truncate text-[14px] font-normal leading-[17px] text-[#2d2c2c]">{description}</div>}
              </div>
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
