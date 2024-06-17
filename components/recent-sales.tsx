export function RecentSales({ historyData }: any) {
  console.log(historyData);
  return (
    <div className="space-y-8">
      {historyData.map((item: any, index: number) => (
        <div key={index} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none capitalize">
              {item.medicineName}
            </p>
            <p className="text-sm text-muted-foreground">
              Container Number: {item.containerNumber}
            </p>
          </div>
          <div className="flex flex-col ml-auto">
            <div className=" font-light text-sm">
              {new Date(item.date).toLocaleDateString("en-US", {
                timeZone: "UTC",
              })}
            </div>
            <div className="ml-auto font-light text-sm">
              {item.dispenseTime}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
