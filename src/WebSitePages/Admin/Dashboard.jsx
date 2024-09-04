import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../Admin/Dashboard.module.css";
import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProducts";
import { ProductId } from "../../Components/Navbar/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFetchProducts from "../../Store/useFetchProducts";
import { SET_PRODUCTS } from "../../Store/productSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoMdArrowDropup } from "react-icons/io";
import { RiStore2Line } from "react-icons/ri";
import { RiBriefcase4Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import salesAnalyticsChart from "../../assets/salesAnalyticsChart.svg";
import CircularProgress from "@mui/joy/CircularProgress";
import Chart from "chart.js/auto";
import AdminFooter from "./AdminFooter";

const Dashboard = () => {
  // <==== Variable Declaration ====>
  const percentage = 66.67;
  let { showLoader, isLoading, setisLoading } = useContext(ProductId);

  // Doughnut Chart
  let doughnutChart = () => {
    new Chart(document.getElementById("myDoughnutChart"), {
      type: "doughnut",
      options: {
        cutout: 100,
        radius: 120,
      },
      data: {
        labels: ["Product A", "Product B", "Product C"],
        datasets: [
          {
            label: "Sales",
            data: [42, 26, 15],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  };

  // Bar Chart
  let barChart = () => {
    new Chart(document.getElementById("barChart"), {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            type: "line",
            label: "Revenue",
            data: [22, 46, 15, 70, 55, 90, 15, 40, 68, 51, 30, 52],
            backgroundColor: "#60EDBB",
            borderColor: "#60EDBB",
            tension: 0.4,
          },
          {
            type: "bar",
            label: "Revenue",
            data: [42, 56, 65, 40, 75, 30, 25, 80, 48, 31, 90, 12],
            backgroundColor: "#6F7BD9",
            barThickness: 25,
          },
        ],
      },
    });
  };

  useEffect(() => {
    barChart();
    doughnutChart();
  }, []);

  // <==== Getting & SETTING DATA ====>
  let dispatch = useDispatch();
  let getData = async () => {
    setisLoading(true);
    let data = await useFetchProducts();
    dispatch(SET_PRODUCTS(data));
    setisLoading(false);
  };
  useEffect(() => {
    getData();
    return;
  }, []);

  return (
    <div id={style.dashWrapper}>
      <div style={{ padding: "24px" }}>
        <div className="row">
          <div className="col-12">
            <h6 style={{ paddingBottom: "24px" }}>DASHBOARD</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            {/* <============ Numbers of sales, Sales Revenue, average Price ============>  */}
            <div className="row mb-4">
              <div className="col-4">
                <Card
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.2)",
                  }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between  align-items-center">
                      <span>Number of Sales</span>
                      <HiOutlineSquare3Stack3D
                        style={{
                          color: "#5664D2",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      />
                    </div>
                    <Card.Text>
                      <h4>1452</h4>
                    </Card.Text>
                  </Card.Body>
                  <hr style={{ margin: "0px" }} />
                  <Card.Body className="d-flex align-items-center">
                    <Badge className="me-2" bg="success">
                      <span className="d-flex align-items-center">
                        <IoMdArrowDropup style={{ fontSize: "1rem" }} />
                        2.4%
                      </span>
                    </Badge>
                    <span>Change in Sales</span>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-4">
                <Card
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.2)",
                  }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Sales Revenue</span>
                      <RiStore2Line
                        style={{
                          color: "#5664D2",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      />
                    </div>
                    <Card.Text>
                      <h4>$ 38452</h4>
                    </Card.Text>
                  </Card.Body>
                  <hr style={{ margin: "0px" }} />
                  <Card.Body className="d-flex align-items-center">
                    <Badge className="me-2" bg="success">
                      <span className="d-flex align-items-center">
                        <IoMdArrowDropup style={{ fontSize: "1rem" }} />
                        2.4%
                      </span>
                    </Badge>
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Change in Revenue
                    </span>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-4">
                <Card
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.2)",
                  }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Average Price</span>
                      <RiBriefcase4Line
                        style={{
                          color: "#5664D2",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      />
                    </div>
                    <Card.Text>
                      <h4>$ 15.4</h4>
                    </Card.Text>
                  </Card.Body>
                  <hr style={{ margin: "0px" }} />
                  <Card.Body className="d-flex align-items-center">
                    <Badge className="me-2" bg="success">
                      <span className="d-flex align-items-center">
                        <IoMdArrowDropup style={{ fontSize: "1rem" }} />
                        2.4%
                      </span>
                    </Badge>
                    <span>Change in Price</span>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/* <============ Revenue Analytics ============>  */}
            <div className="row">
              <div className="col-12">
                <Card
                  style={{
                    width: "100%",
                    border: "none",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.2)",
                  }}
                >
                  <Card.Body>
                    <h6 style={{ fontSize: "16px" }}>Revenue Analytics</h6>
                    <div id={style.graphs}>
                      <div style={{ width: "100%", maxHeight: "280px" }}>
                        <canvas id="barChart" style={{ minWidth: "100%" }} />
                      </div>
                    </div>
                    <Card.Body>
                      <div className="row">
                        <div className="col-4">
                          <div className="d-flex justify-content-center align-items-center mb-2 ">
                            <GoDotFill
                              style={{ color: "yellow", marginRight: "5px" }}
                            />
                            This Months:
                          </div>
                          <div className="fs-5 fw-semibold d-flex justify-content-center align-items-center">
                            <span>$12,253</span>
                            <span className="fs-6 text-success d-flex align-items-center ms-2">
                              <IoMdArrowDropup style={{ fontSize: "1rem" }} />
                              <span>2.2 %</span>
                            </span>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-center align-items-center mb-2 ">
                            <GoDotFill
                              style={{ color: "blue", marginRight: "5px" }}
                            />
                            This Year:
                          </div>
                          <div className="fs-5 fw-semibold d-flex justify-content-center align-items-center">
                            <span>$34,254</span>
                            <span className="fs-6 text-success d-flex align-items-center ms-2">
                              <IoMdArrowDropup style={{ fontSize: "1rem" }} />
                              <span>2.1 %</span>
                            </span>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-center align-items-center mb-2 ">
                            <GoDotFill
                              style={{ color: "green", marginRight: "5px" }}
                            />
                            Previous Year:
                          </div>
                          <div className="fs-5 fw-semibold d-flex justify-content-center align-items-center">
                            <span>$ 32,695</span>
                            <span className="fs-6 text-success d-flex align-items-center ms-2">
                              <IoMdArrowDropup style={{ fontSize: "1rem" }} />
                              <span>2.7 %</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-4">
            {/* Sales Analytics */}
            <Card
              style={{
                width: "100%",
                border: "none",
                boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.2)",
                marginBottom: "24px",
              }}
            >
              <Card.Body>
                <h6 style={{ fontSize: "16px" }}>Sales Analytics</h6>
                <div id={style.circleDiag}>
                  <div style={{ width: "330px" }}>
                    <canvas id="myDoughnutChart" />
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Earning Reports */}
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title className="fs-6 mb-3">Earning Reports</Card.Title>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center d-flex flex-column justify-content-center align-items-center">
                      <CircularProgress
                        determinate
                        value={66.67}
                        sx={{
                          "--CircularProgress-size": "60px",
                          "--CircularProgress-trackThickness": "5px",
                          "--CircularProgress-progressThickness": "5px",
                        }}
                        className="mb-3"
                      />
                      <span className="mb-2">Weekly Earnings</span>
                      <span className="fw-bold fs-5">$2,523</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center d-flex flex-column justify-content-center align-items-center">
                      <CircularProgress
                        determinate
                        value={66.67}
                        color="success"
                        sx={{
                          "--CircularProgress-size": "60px",
                          "--CircularProgress-trackThickness": "5px",
                          "--CircularProgress-progressThickness": "5px",
                        }}
                        className="mb-3"
                      />
                      <span className="mb-2">Monthly Earnings</span>
                      <span className="fw-bold fs-5">$11,235</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* <======== Footer ========> */}
      <AdminFooter style={{ marginTop: "24px" }} />
    </div>
  );
};

export default Dashboard;
