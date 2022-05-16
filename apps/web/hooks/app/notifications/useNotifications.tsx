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

  const notificationsQuery = useQuery(GET_MY_NOTIFICATIONS_QUERY, {
    skip: !user.is,
    variables: {
      page: 1,
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
      notificationsQuery.fetchMore({
        variables: {
          page: notificationsQuery.data.getMyNotifications.nextPage,
        },
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
    notificationsQuery.data?.getMyNotifications?.nextPage,
  ]);

  return { notificationsQuery, user, loadMoreElement };
};
