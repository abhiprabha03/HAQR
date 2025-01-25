import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MapPin, MousePointer } from "lucide-react";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/analytics-summary") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setAnalyticsData(data))
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  if (!analyticsData) {
    return <div className="text-center text-2xl mt-20">Loading Analytics...</div>;
  }

  const chartData = Object.entries(analyticsData).map(([maskedUrl, data]) => ({
    name: maskedUrl,
    clicks: data.clicks,
  }));

  return (
    <div className="container mx-auto p-8 bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">
        URL Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(analyticsData).map(([maskedUrl, data]) => (
          <div
            key={maskedUrl}
            className="bg-white border rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <QRCodeSVG
                value={data.originalUrl}
                size={100}
                className="p-2 bg-gradient-to-r from-blue-100 via-white to-gray-100 rounded-lg shadow"
              />
              <div className="text-right">
                <h3 className="font-semibold text-lg truncate">{maskedUrl}</h3>
                <a
                  href={data.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm underline"
                >
                  {data.originalUrl}
                </a>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="flex justify-center items-center mb-4">
                <MousePointer className="mr-2 text-blue-600" size={20} />
                <span className="text-lg font-medium text-gray-700">Clicks:</span>
                <span className="ml-2 text-2xl font-bold text-blue-700">
                  {data.clicks}
                </span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 text-green-600" size={20} />
                <div>
                  <span className="text-lg font-medium text-gray-700">
                    Locations:
                  </span>
                  <p className="text-sm text-gray-600">
                    {data.locations.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
