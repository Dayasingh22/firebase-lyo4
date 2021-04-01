import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import {
  FaFolderPlus,
  FaMoneyCheckAlt,
  FaClock,
  FaUserFriends,
  FaFolderOpen,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Aside = ({ toggled, handleToggleSidebar }) => {
  const location = useLocation();
  return (
    <ProSidebar
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          Flow Chart
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaMoneyCheckAlt />}>
            <Link to="/" />
            Home
          </MenuItem>
          <MenuItem icon={<FaFolderOpen />}>
            <Link to="/issue" />
            All Projects
          </MenuItem>
          <MenuItem icon={<FaClock />}>
            <Link to="/issue" />
            Recent
          </MenuItem>
          <MenuItem icon={<FaFolderPlus />}>
            <Link to="/issue" />
            Created by Me
          </MenuItem>
          <MenuItem icon={<FaUserFriends />}>
            <Link to="/issue" />
            Shared With Me
          </MenuItem>
        </Menu>
      </SidebarContent>
      {location.pathname === "/issue" ? (
        ""
      ) : (
        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a href="/issue" className="sidebar-btn" rel="noopener noreferrer">
              <FaArrowLeft />
              <span>Back To Dashboard</span>
            </a>
          </div>
        </SidebarFooter>
      )}
    </ProSidebar>
  );
};

export default Aside;
