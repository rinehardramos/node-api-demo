SET sql_mode='NO_AUTO_VALUE_ON_ZERO';
INSERT INTO `ref_user_roles_tb` (`user_role_id`, `user_role_name`, `datetime_created`, `datetime_updated`, `archive_flag`) VALUES
(0, 'No Role', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0),
(1, 'Super Admin', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0),
(2, 'Admin', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0),
(3, 'Manager 1', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0),
(4, 'Manager 2', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0),
(5, 'Staff 1', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0),
(6, 'Staff 2', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0);

INSERT INTO `ref_user_statuses_tb` (`user_status_id`, `user_status_name`, `datetime_created`, `datetime_updated`, `archive_flag`) VALUES
(0, 'Deleted or Inactive', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0),
(1, 'Active', '2023-07-26 08:09:26', '2023-07-26 08:09:26', 0);

SET sql_mode='';