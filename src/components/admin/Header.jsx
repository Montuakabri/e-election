import React, { useState } from "react";
import { HiArrowsPointingIn, HiArrowsPointingOut } from "react-icons/hi2";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { MdDashboard } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { Link } from "react-router-dom";

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsedChange = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const menuItemActive = (path) =>
    window.location.pathname.includes(path) ? "active" : ""; // Cleaner active class logic

  return (
    <div>
      <Sidebar
        style={{ height: "100%", position: "absolute" }}
        collapsed={collapsed}
      >
        <main>
          <Menu className="mb-5">
            {collapsed ? (
              <MenuItem
                icon={<HiArrowsPointingOut />}
                onClick={handleCollapsedChange}
              />
            ) : (
              <MenuItem
                suffix={<HiArrowsPointingIn />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bolder",
                    letterSpacing: "1px",
                  }}
                >
                  ADMIN
                </div>
              </MenuItem>
            )}
          </Menu>

          <Menu>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem
                icon={<MdDashboard />}
                className={menuItemActive("dashboard")} // Use reusable function
              >
                Dashboard
              </MenuItem>
            </Link>
          </Menu>
          <Menu>
            <Link
              to="/party"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem
                icon={<FaPeopleGroup />}
                className={menuItemActive("party")}
              >
                Party
              </MenuItem>
            </Link>
          </Menu>
          {/* Similar Menu components for other links */}
          <Menu onClick={handleLogout}>
            <a
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "800",
                backgroundColor: "red",
              }}
            >
              <MenuItem icon={<RxExit />}>LOG OUT</MenuItem>
            </a>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
};

export default Header;
