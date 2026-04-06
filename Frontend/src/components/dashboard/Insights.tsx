import { CategoryOverview } from '../ui/CategoryOverview';
import { QuickStats } from './QuickStats';

export function Insights() {
  return (
    <div className="p-10 text-black">
      <div>
        <QuickStats />
        <div className="mt-6">
          <CategoryOverview/>
        </div>
      </div>
    </div>
  );
}
