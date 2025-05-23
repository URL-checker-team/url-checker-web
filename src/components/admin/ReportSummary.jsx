import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Paper, Typography, Box } from "@mui/material";

export default function ReportSummary() {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    document.title = "Admin Dashboard - Report Summary";

    axios
      .get("http://localhost:5050/api/report-summary")
      .then((res) => {
        setSummary(res.data.summary);
        setChartData(res.data.chart);
      })
      .catch((err) => console.error("Failed to fetch summary:", err));
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
        Report Summary
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={2}
        mb={4}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total URLs Checked
          </Typography>
          <Typography variant="h5" color="primary">
            {summary.totalUrlsChecked}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Malicious URLs
          </Typography>
          <Typography variant="h5" color="error">
            {summary.maliciousCount}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Safe URLs
          </Typography>
          <Typography variant="h5" color="success.main">
            {summary.safeCount}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Latest Check
          </Typography>
          <Typography variant="h6">{summary.latestCheck}</Typography>
        </Paper>
      </Box>
      {/* chart card */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(4, 1fr)" }}
        gap={2}
        mb={4}
      >
        {/* chart part*/}
        <Box gridColumn={{ xs: "span 4", md: "span 3" }}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
              URL Check Trends (Last 7 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="malicious" fill="#f44336" name="Malicious URLs" />
                <Bar dataKey="safe" fill="#4caf50" name="Safe URLs" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Top 3 Malicious Types */}
        <Box gridColumn={{ xs: "span 4", md: "span 1" }}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
              Top 3 Malicious Types
            </Typography>
            {summary.topMaliciousTypes &&
            summary.topMaliciousTypes.length > 0 ? (
              summary.topMaliciousTypes.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  borderBottom="1px solid #eee"
                  py={1}
                >
                  <Typography variant="body2">{item.type}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {item.count}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No data available
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
