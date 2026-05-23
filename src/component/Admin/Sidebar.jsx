import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { ExpandMore as ExpandMoreIcon, PostAdd as PostAddIcon, Add as AddIcon, ImportExport as ImportExportIcon, ListAlt as ListAltIcon, Dashboard as DashboardIcon, People as PeopleIcon, RateReview as RateReviewIcon } from "@mui/icons-material";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>
            <Link to="#">
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;
