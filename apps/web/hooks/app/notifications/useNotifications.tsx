import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import MAKE_NOTIFICATIONS_READ from "../../../logic/notifications/mutations/makeNotificationsReadMutation";
import GET_MY_NOTIFICATIONS_QUERY from "../../../logic/notifications/queries/getMyNotificationsQuery";
import { UserStateActions } from "../../../store/slices/userSlice";
import { useUser } from "../../auth/useUser";
import { useClearApolloCacheOnExit } from "../useClearApolloCacheOnExit";
import { useScrollTop } from "../useScrollTop";

export const useNotifications = () => {
  useScrollTop();
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
      dispatch(UserStateActions.notificationsRead());
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

  useClearApolloCacheOnExit("getMyNotifications");

  return { notificationsQuery, user, loadMoreElement };
};
