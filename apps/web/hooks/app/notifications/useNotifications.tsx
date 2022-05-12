import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import MAKE_NOTIFICATIONS_READ from "../../../app/notifications/mutations/makeNotificationsReadMutation";
import GET_MY_NOTIFICATIONS_QUERY from "../../../app/notifications/queries/getMyNotificationsQuery";
import USER_CASES from "../../../app/store/reducers/user/cases";
import { useUser } from "../../auth/useUser";

export const useNotifications = () => {
  const user = useUser();
  const dispatch = useDispatch();

  const [makeNotificationsRead] = useMutation(MAKE_NOTIFICATIONS_READ);

  const [currPage, setCurrPage] = useState(1);
  const notificationsQuery = useQuery(GET_MY_NOTIFICATIONS_QUERY, {
    skip: !user.is,
    variables: {
      page: currPage,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: async (data) => {
      await makeNotificationsRead();
      dispatch({ type: USER_CASES.NOTIFICATIONS_READ });
    },
  });

  const loadMoreElement: any = useRef(null);

  const fetchMore = () => {
    if (notificationsQuery.data.getMyNotifications.hasNextPage) {
      setCurrPage((prevPage) => {
        notificationsQuery.fetchMore({
          variables: { page: prevPage + 1 },
        });
        return prevPage + 1;
      });
    }
  };

  useEffect(() => {
    if (
      !notificationsQuery.data ||
      !notificationsQuery.data.getMyNotifications.hasNextPage
    ) {
      return;
    }
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
      })
    );
    const el = loadMoreElement.current;

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [
    loadMoreElement.current,
    notificationsQuery.data?.getMyNotifications?.hasNextPage,
  ]);

  return { notificationsQuery, user, loadMoreElement };
};
