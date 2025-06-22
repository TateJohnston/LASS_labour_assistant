import { Chart as ChartJS, Legend, Ticks } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Box } from "@mui/material";

export const BarChart = ({
  labels,
  datasets,
  xAxisText,
  yAxisText,
  backgroundColor,
  xAxisTextFontSize,
  yAxisTextFontSize,
  showLegend = true,
  tickFontSize,
  ticksPadding,
}) => {
  return (
    <Box
      sx={{
        width: "80vw",
        height: "100%",
        padding: "15px",
        borderRadius: "5px",
        paddingRight: "40px",
      }}
    >
      <Bar
        data={{
          labels,
          datasets,
          backgroundColor,
        }}
        options={{
          plugins: { legend: { display: showLegend } },
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              title: {
                display: true,
                text: xAxisText,
                font: { size: xAxisTextFontSize, weight: "bold" },
                padding: { top: 15 },
              },
              ticks: {
                padding: ticksPadding,
                font: { size: tickFontSize },
              },
            },

            y: {
              title: {
                display: true,
                text: yAxisText,
                font: { size: yAxisTextFontSize, weight: "bold" },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export const DoughnutChart = ({
  labels,
  datasets,
  xAxisText,
  yAxisText,
  backgroundColor,
  xAxisTextFontSize,
  yAxisTextFontSize,
  showLegend = true,
}) => {
  return (
    <Box
      sx={{
        width: "40vw",
        height: "100%",
        borderRadius: "5px",
        paddingRight: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Doughnut
        data={{
          labels,
          datasets,
          backgroundColor,
        }}
      />
    </Box>
  );
};
