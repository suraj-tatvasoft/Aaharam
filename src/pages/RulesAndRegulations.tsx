import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/PageLayout';

const RulesAndRegulations = () => {
  return (
    <PageLayout title="Rules & Regulations">
      <div className="w-full min-w-full space-y-4 bg-gray-100 p-4">
        {/* Key Rules Card */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[#222]">Key Rules</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="list-disc space-y-3 pl-5">
              <li className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Order Timing: </span>
                Orders can be placed between 7:00 AM and 9:00 PM daily.
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Meal Pass Validity: </span>
                Each meal pass is valid for 30 days from the date of purchase.
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Order Collection: </span>
                Please collect your order within 30 minutes of the scheduled time.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Usage Guidelines Card */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[#222]">Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                Please use the app responsibly and respect the meal timings. Each meal pass is meant for individual use only and cannot be transferred
                or shared. In case of any issues with your order or if you need assistance, please contact our support team through the app or email
                us at support@aaharam.com.
              </p>
              <p>We appreciate your cooperation in maintaining a smooth and efficient service for all our users.</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support Card */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[#222]">Contact & Support</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                We value respectful interaction between all users and our support team. If you have any concerns or need assistance, please raise them
                through the app's support section. Our team is available to help you from 9:00 AM to 10:00 PM every day.
              </p>
              <p>
                For urgent matters, please call our helpline at +91-XXXXXXXXXX or email us at help@aaharam.com. We aim to respond to all queries
                within 24 hours.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RulesAndRegulations;
