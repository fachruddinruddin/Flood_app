import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { Activity, CloudRain } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    banjirCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flood");
        const banjirCount = response.data.length;

        setStats({
          banjirCount,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-lg p-6 animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Total Banjir"
            count={stats.banjirCount}
            icon={<CloudRain className="w-10 h-10" />}
          />
          <Card
            title="Active Users"
            count="87%"
            icon={<Activity className="w-10 h-10" />}
          />
        </div>
      )}

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi</h2>
        <p className="text-gray-600">
          Selamat datang di halaman dashboard. Di sini Anda dapat memantau
          metrik utama tentang mahasiswa dan aktivitas sistem. Data diperbarui
          secara real-time dari sumber lokal dan API.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
