import React from "react";
import GroupsTab from "@/components/ui/groups/group-componet";

const Groups: React.FC = () => {
  // useEffect(() => {
  //   if (!isLoaded) return;
  //   if (!isSignedIn) return;

  //   const apiCall = async () => {
  //     const token = await getToken();

  //     const res = await axios.post(
  //       `${BASE_URL}/users/check-token-verification`,
  //       { userId: "64a7f4e2f1c2b8e5d6a4c3b2" },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     console.log(res.data);
  //   };

  //   apiCall();
  // }, [isLoaded, isSignedIn, getToken]);

  return (
    <div className="p-4">
      <GroupsTab />
    </div>
  );
};

export default Groups;
