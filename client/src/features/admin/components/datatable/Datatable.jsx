import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../source/datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  return (
    <div className="datatable">
      <div className="datatableTitle">
      
        <Link to="" className="link">
          Add New
        </Link>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> 
      </div>
      <DataGrid
        className="container datagrid"
        rows={data}
        columns={userColumns.concat()}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
