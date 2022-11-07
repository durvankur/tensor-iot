import React, { useState, useEffect } from "react";
import { Table, Popover, List, Button, Divider } from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import { getFilterUrl } from "../../utility";
import { columns } from "../../constants";
import "antd/dist/antd.css";
import "./index.css";
import Modal from "../../components/modal";

export const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setFilter] = useState("All Launches");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const limit = 10;
  const [total, setTotal] = useState(limit);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();

  const getData = async () => {
    setLoading(true);
    const filterUrl = getFilterUrl(selectedFilter);
    const data = await axios.get(
      `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${
        (page - 1) * limit
      }${filterUrl || ""}`
    );
    setLoading(false);
    setTotal(data.headers["spacex-api-count"]);
    const specifiedData = data.data?.map((launch) => ({
      ...launch,
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      launch_site: launch.launch_site.site_name,
      launch_date_utc: `${new Date(
        launch.launch_date_utc
      ).toDateString()} At ${new Date(
        launch.launch_date_utc
      ).toLocaleTimeString()}`,
      rocket_name: launch.rocket.rocket_name,
      orbit: launch.rocket.second_stage?.payloads?.[0]?.orbit,
      launch_status: launch.upcoming
        ? "Upcoming"
        : launch.launch_success
        ? "Success"
        : "Failed",
    }));
    setRows(specifiedData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (page) {
      getData();
    }
  }, [page, selectedFilter]);

  const onPaginationChange = (pageSize) => {
    setPage(pageSize);
  };

  const selectFilter = (filter) => (e) => {
    setFilter(filter);
    setPage(1);
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onRow = (rowData) => {
    setIsModalOpen(true);
    setSelectedRecord(rowData);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div>
      <div className="header">Spacex</div>
      <Divider />
      <div className="filter-wrapper">
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Past 6 Months <DownOutlined />
        </div>
        <Popover
          content={
            <List
              size="small"
              dataSource={[
                "All Launches",
                "Successful Launches",
                "Failed Launches",
              ]}
              renderItem={(item) => (
                <List.Item
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={selectFilter(item)}
                >
                  {item}
                </List.Item>
              )}
            />
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button className="btn-text">
            <FilterOutlined />
            {selectedFilter} <DownOutlined />
          </Button>
        </Popover>
      </div>
      <Table
        className="table"
        onRow={(record) => ({
          onClick: () => onRow(record),
        })}
        locale={{
          emptyText: <div>'No result found for specified filter'</div>,
        }}
        loading={loading}
        columns={columns}
        dataSource={rows}
        pagination={{
          defaultPageSize: limit,
          total,
          showSizeChanger: false,
          onChange: onPaginationChange,
        }}
      />
      <Modal handleCancel={handleCancel} isModalOpen={isModalOpen} selectedRecord={selectedRecord}/>
    </div>
  );
};
