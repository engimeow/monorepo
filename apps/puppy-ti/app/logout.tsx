import { supabase } from "./providers/authProvider";

export const LogoutButton = () => {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <button type="button" onClick={handleLogOut}>
      로그아웃
    </button>
  );
};
