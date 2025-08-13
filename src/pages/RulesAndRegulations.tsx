import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';

const RulesAndRegulations = () => {
  return (
    <PageLayout title="Rules & Regulations">
      <div className="w-full min-w-full space-y-4 p-4">
        <Card className="rounded-2xl border-0 shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-[16px] font-medium leading-[11px] tracking-[0] text-[#212121]">Key Rules</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-[#4D4D4D]">
            <ul className="font-regular list-disc space-y-2 pl-4 text-[14px] leading-[20px]">
              <li>Place your order within the specified time slots.</li>
              <li>Meal passes are valid only for regular menu items.</li>
              <li>Collect your order promptly once notified.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-[16px] font-medium leading-[11px] tracking-[0] text-[#212121]">Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="font-regular space-y-2 text-[14px] leading-[22px] text-[#4D4D4D]">
              <p>
                Please use the app responsibly and respect the meal timings. Each meal pass is meant for individual use only and cannot be transferred
                or shared. In case of any issues with your order or if you need assistance, please contact our support team through the app or email
                us at support@aaharam.com.
              </p>
              <p>We appreciate your cooperation in maintaining a smooth and efficient service for all our users.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-none">
          <CardHeader className="p-4">
            <CardTitle className="text-[16px] font-medium leading-[11px] tracking-[0] text-[#212121]">Contact & Support</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="font-regular space-y-2 text-[14px] leading-[22px] text-[#4D4D4D]">
              <p>
                We value respectful interaction between all users and our support team. If you have any concerns or need assistance, please raise them
                through the app's support section. Our team is available to help you from 9:00 AM to 10:00 PM every day.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RulesAndRegulations;
