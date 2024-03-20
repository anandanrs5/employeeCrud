import React, { useEffect, useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, viewEmployee } from "../../redux/action/action";

const Home = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [changeData, setChangeData] = useState();
  const employeeData =
    useSelector((state) => state.view_employee.inputData) || [];
  console.log(employeeData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userToken = JSON.parse(authToken);
        const response = await dispatch(viewEmployee(userToken));
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [dispatch, changeData]);

  const columns = [
    {
      name: "fullname",
      label: "Employee Name",
      options: {
        sort: true,
        customBodyRender: (value) => (
          <div style={{ textAlign: "start" }}>{value}</div>
        ),
      },
    },
    {
      name: "salary",
      label: "Salary",
      options: {
        sort: true,
        customBodyRender: (value) => (
          <div style={{ textAlign: "start" }}> {value}</div>
        ),
      },
    },
    {
      name: "designation",
      label: "Designation",
      options: {
        sort: true,
        customBodyRender: (value) => (
          <div style={{ whiteSpace: "pre-wrap" }}>{value}</div>
        ),
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        sort: true,
        customBodyRender: (value) => (
          <div style={{ textAlign: "start" }}>{value}</div>
        ),
      },
    },

    {
      name: "_id",
      label: "Actions",
      options: {
        sort: true,
        customBodyRender: (rowIndex, tableMeta) => {
          const rowData = tableMeta.rowData;
          console.log(tableMeta);
          const employeeId = rowData[4];

          return (
            <Box sx={{ display: "flex" }} className="action_btn">
              <Link to={`/employee/edit/${employeeId}`}>
                <Button className="table_edit_btn">Edit</Button>
              </Link>
              <Button
                className="table_delete_btn"
                onClick={() => handleDelete(employeeId)}
              >
                Delete
              </Button>
            </Box>
          );
        },
      },
    },
  ];
  const handleAdd = () => {
    navigate("/employee/add");
  };
  const handleDelete = async (employeeId) => {
    setChangeData(employeeId);
    const authToken = localStorage.getItem("token");
    const userToken = JSON.parse(authToken);
    const apiResponse = await dispatch(deleteEmployee(employeeId, userToken));
  };
  const options = {
    elevation: 0,
    expandableRows: false,
    filter: false,
    responsive: "standard",
    selectableRows: false,
  };

  return (
    <div className="App">
      <Grid>
        <Box>
          <Button
            sx={{
              backgroundColor: "green",
              color: "white",
              position: "relative",
              top: "40px",
              left: "20px",
              zIndex: 1,
            }}
            onClick={handleAdd}
          >
            Add Employee
          </Button>
        </Box>
        <MUIDataTable
          title=""
          data={employeeData}
          columns={columns}
          options={options}
        />
      </Grid>
    </div>
  );
};

export default Home;
