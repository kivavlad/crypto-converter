import { useAppSelector } from "../../hooks/use-app-selector";
import { Outlet } from "react-router-dom";
import { BottomMenu } from "../../components/bottom-menu";

export const Layout: React.FC = () => {
  const { isAuth, access } = useAppSelector(state => state.session);

  if (isAuth && access) {
    return (
      <>
        <Outlet/>
        <BottomMenu/>
      </>
    )
  }
}