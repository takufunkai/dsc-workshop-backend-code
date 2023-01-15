import dayjs from "dayjs";
import DefaultLayout from "../layouts/defaultLayout";
import Typography from "@mui/material/Typography";
import EntryForm from "../components/dashboard/entryForm";
import EntryList from "../components/dashboard/entryList";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserEntriesCountQuery } from "../lib/firestore";
import { onSnapshot } from "firebase/firestore";
import useAuthStore from "../lib/store/authStore";

const DashboardPage = () => {
  const date = dayjs().format("dddd, DD MMMM YYYY");
  const [entriesCount, setEntriesCount] = useState(0);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user?.email) return;

    const userEntriesQuery = getUserEntriesCountQuery(user.email);

    const unsubscribe = onSnapshot(userEntriesQuery, (doc) => {
      setEntriesCount(doc.data()?.count || 0);
    });

    return () => {
      setEntriesCount(0);
      unsubscribe();
    };
  }, [user]);

  return (
    <DefaultLayout>
      <Typography variant="h4" gutterBottom color="grey">
        {date}
      </Typography>
      <Typography variant="h6" gutterBottom color="grey">
        {entriesCount} entries total
      </Typography>

      <Box sx={{ maxWidth: 600 }}>
        <EntryForm />
        <EntryList />
      </Box>
    </DefaultLayout>
  );
};

export default DashboardPage;
