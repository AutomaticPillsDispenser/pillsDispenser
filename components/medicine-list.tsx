"use client";

import { useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { Button } from "./ui/button";

export function MedicineList({ record, getHistory }: any) {
  const [activeIndex, setActiveIndex] = useState(null);

  const [colors, setColors] = useState(
    record.map((entry) => entry.fill || "#ddeded")
  );

  const handleClick = (data, index) => {
    if (data.name != "") {
      const newColors = record.map((entry, i) =>
        i === index ? "#FF9D65" : entry.fill || "#ddeded"
      );
      setColors(newColors);
      setActiveIndex(index + 2);
    }
  };

  const handleDispense = async (data, index) => {
    if (activeIndex != null) {
      try {
        const response = await fetch("http://localhost:3000/immediate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            containerNumber: activeIndex,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        getHistory();
        console.log("Item deleted successfully:", result);
      } catch (error) {
        console.error("There was a problem with the delete request:", error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  const data02 = record.map((entry, index) => ({
    ...entry,
    fill: colors[index],
  }));
  const deleteItem = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/medicines/" + activeIndex,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setActiveIndex(null)
      getHistory();
      console.log("Item deleted successfully:", result);
    } catch (error) {
      console.error("There was a problem with the delete request:", error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <>
      {activeIndex && (
        <div className="w-full items-end flex flex-row">
          <Button
            onClick={deleteItem}
            className="ml-auto"
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      )}
      <ResponsiveContainer width="100%" height={500}>
        <PieChart width={800} height={800}>
          <Pie
            data={[{ name: "Group A", value: 110 }]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            fill="#FF9D65"
            animationBegin={0}
            animationDuration={0}
            paddingAngle={0}
            stroke="none"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx;
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              return (
                <text
                  x={x}
                  y={y}
                  fill="#fff"
                  fontSize={20}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  Dispense
                </text>
              );
            }}
            onClick={handleDispense}
          />
          <Pie
            animationBegin={0}
            animationDuration={0}
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            startAngle={30}
            endAngle={390} // 360 + 30
            innerRadius={120}
            outerRadius={200}
            labelLine={true} // Disable label line for better performance
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              return (
                <foreignObject x={x - 50} y={y - 25} width={100} height={50}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      width: "100%",
                      borderRadius: "4px",
                      padding: "4px",
                      textAlign: "center",
                    }}
                  >
                    <div className="text-xl font-bol">
                      {index + 2 == 7 ? 1 : index + 2}
                    </div>
                    {index + 2 != 7 && (
                      <div className="capitalize text-sm">
                        {data02[index].name}({data02[index].quantity})
                      </div>
                    )}
                  </div>
                </foreignObject>
              );
            }}
            onClick={handleClick}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
