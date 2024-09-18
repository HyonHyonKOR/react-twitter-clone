import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h5>Header</h5>
      <Outlet />
    </>
  );
}
