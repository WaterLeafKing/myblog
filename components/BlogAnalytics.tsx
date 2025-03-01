import { getBlogAnalytics } from '@/utils/blogAnalytics';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export default function BlogAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const data = await getBlogAnalytics();
      setAnalytics(data);
    }
    fetchAnalytics();
  }, []);

  if (!analytics) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-8">
      {/* Word Frequency Chart */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">Most Used Words</h2>
        <Bar
          data={{
            labels: analytics.wordFrequency.map((w: any) => w.word),
            datasets: [
              {
                label: 'Word Frequency',
                data: analytics.wordFrequency.map((w: any) => w.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          }}
        />
      </div>

      {/* Post Frequency Chart */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">Posts Over Time</h2>
        <Line
          data={{
            labels: analytics.postFrequency.labels,
            datasets: [
              {
                label: 'Posts per Month',
                data: analytics.postFrequency.data,
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1,
              },
            ],
          }}
        />
      </div>

      {/* Content Length Distribution */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">Content Length</h2>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">
            Average Length: {Math.round(analytics.contentLength.average)}{' '}
            characters
          </p>
        </div>
        <div className="mt-4 grid gap-2">
          {analytics.contentLength.byPost.map((post: any) => (
            <div key={post.title} className="flex justify-between">
              <span className="truncate">{post.title}</span>
              <span>{post.length} chars</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
