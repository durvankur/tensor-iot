export const columns = [
  {
    title: "Id",
    dataIndex: "flight_number",
  },
  {
    title: "Launched UTC",
    dataIndex: "launch_date_utc",
  },
  {
    title: "Location",
    dataIndex: "launch_site",
  },
  {
    title: "Mission",
    dataIndex: "mission_name",
  },
  {
    title: "Orbit",
    dataIndex: "orbit",
  },
  {
    title: "Launch Status",
    dataIndex: "launch_status",
    render: (_, record) => (
      <div
        className={`${
          record.launch_status === "Upcoming"
            ? "upcoming"
            : record.launch_status === "Success"
            ? "success"
            : "fail"
        }`}
      >
        {record.launch_status}
      </div>
    ),
  },
  {
    title: "Rocket",
    dataIndex: "rocket_name",
  },
];
