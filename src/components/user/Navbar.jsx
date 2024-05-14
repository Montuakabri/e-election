import React, { useState } from "react";
import { HiArrowsPointingIn, HiArrowsPointingOut } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = React.useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Sidebar
        style={{ height: "100%", position: "absolute" }}
        collapsed={collapsed}
      >
        <main>
          <Menu className="mb-5">
            <MenuItem
              icon={
                collapsed ? <HiArrowsPointingOut /> : <HiArrowsPointingIn />
              }
              onClick={handleCollapsedChange}
            >
              {collapsed ? null : (
                <div
                  style={{
                    padding: "9px",
                    color: "gray",
                    fontWeight: "bolder",
                    fontSize: 14,
                    letterSpacing: "1px",
                  }}
                >
                  USER
                </div>
              )}
            </MenuItem>
          </Menu>

          <Menu>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem
                icon={<MdDashboard />}
                className={
                  window.location.pathname.includes("dashboard") ? "active" : ""
                }
              >
                Home
              </MenuItem>
            </Link>
          </Menu>

          <Menu>
            <MenuItem
              icon={<FaUser />}
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              Profile
            </MenuItem>
            <Transition in={open} timeout={400}>
              {(state) => (
                <Modal
                  keepMounted
                  open={!["exited", "exiting"].includes(state)}
                  onClose={() => setOpen(false)}
                  // Adjust your modal styling here
                >
                  <ModalDialog>
                    <DialogTitle className="card-header">
                      User Profile
                    </DialogTitle>
                    <DialogContent>
                      <div className="card border-light mb-3">
                        <div className="card-body">
                          <h5 className="card-title">
                            Name: <b>{userData.name}</b>
                          </h5>
                          {/* Render other profile information here */}
                        </div>
                      </div>
                    </DialogContent>
                  </ModalDialog>
                </Modal>
              )}
            </Transition>
          </Menu>

          <Menu onClick={handleLogout}>
            <MenuItem icon={<RxExit />}>LOG OUT</MenuItem>
          </Menu>
        </main>
      </Sidebar>
    </div>
  );
};

export default Navbar;
