-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.5.11-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sboard 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sboard` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sboard`;

-- 테이블 sboard.sboard_agent 구조 내보내기



CREATE TABLE IF NOT EXISTS `sboard_agent` (
  `id` varchar(32) NOT NULL COMMENT '에이전트 ID',
  `name` varchar(64) DEFAULT NULL COMMENT '에이전트 이름',
  `details` varchar(64) DEFAULT NULL COMMENT '에이전트 설명',
  `host` varchar(24) DEFAULT NULL COMMENT '호스트',
  `port` varchar(6) DEFAULT NULL COMMENT '포트',
  `mac` varchar(24) DEFAULT NULL COMMENT 'MAC 주소 (또는 단말고유정보)',
  `model_id` varchar(32) DEFAULT NULL COMMENT '설정된 모델 ID',
  `template_id` varchar(32) DEFAULT NULL COMMENT '설정된 템플레이트 ID',
  `model_deploy_date` datetime DEFAULT NULL COMMENT '모델 배포일시',
  `template_deploy_date` datetime DEFAULT NULL COMMENT '템플레이트 배포일시',
  `status` varchar(6) DEFAULT NULL COMMENT '현재상태 (OFF : 통신안됨, NORMAL : 정상, ERROR : 에러, WARN : 경고)',
  `status_date` datetime DEFAULT NULL COMMENT '최근상태저장일시',
  `create_date` datetime DEFAULT NULL COMMENT '생성일시',
  `modify_date` datetime DEFAULT NULL COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID',
  `server_data_time` varchar(24) DEFAULT NULL COMMENT '최근 데이터 업데이트 시간 (서버쪽)',
  `data_time` varchar(24) DEFAULT NULL COMMENT '최근 데이터 업데이트 시간 (단말쪽)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='에이전트';

-- 테이블 데이터 sboard.sboard_agent:~36 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_agent` DISABLE KEYS */;
INSERT INTO `sboard_agent` (`id`, `name`, `details`, `host`, `port`, `mac`, `model_id`, `template_id`, `model_deploy_date`, `template_deploy_date`, `status`, `status_date`, `create_date`, `modify_date`, `create_id`, `modify_id`, `server_data_time`, `data_time`) VALUES
	('sba_smc_oph_0001', '안과 대대합', '안과 대대합 전광판', NULL, NULL, NULL, 'sbm_smc_oph_0001', 'sbt_smc_oph_0001', NULL, NULL, NULL, NULL, '2018-04-17 17:32:43', '2018-04-17 17:32:43', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_oph_0002', 'CT 치료실', 'CT 치료실', NULL, NULL, NULL, 'sbm_smc_oph_0002', 'sbt_smc_oph_0002', NULL, NULL, NULL, NULL, '2018-04-17 17:38:41', '2018-04-17 17:38:41', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_oph_0101', '안과 검사실 대대합', '안과 검사실 대대합', '203.249.222.211', '', '', 'sbm_smc_oph_0101', 'sbt_smc_oph_0101', NULL, NULL, 'NORMAL', '2019-09-05 16:51:07', '2018-04-17 17:41:55', '2019-09-05 16:51:07', 'admin01', 'admin01', '2019-12-20 11:35:48.459', '2019-09-05 16:50:50.1'),
	('sba_smc_oph_0004', '안과 검사실 1', '안과 검사실 1', NULL, NULL, NULL, 'sbm_smc_oph_0004', 'sbt_smc_oph_0004', NULL, NULL, NULL, NULL, '2018-04-17 17:45:08', '2018-04-17 17:45:09', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_oph_0005', '안과 검사실 2', '안과 검사실 2', NULL, NULL, NULL, 'sbm_smc_oph_0005', 'sbt_smc_oph_0005', NULL, NULL, NULL, NULL, '2018-04-17 17:45:08', '2018-04-17 17:45:09', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_test_0001', '테스트 1', '테스트 1', NULL, NULL, NULL, 'sbm_smc_oph_0005', 'sbt_smc_oph_0005', NULL, NULL, NULL, NULL, '2018-04-17 17:45:08', '2018-04-17 17:45:09', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_test_0002', '테스트 2', '테스트 2', NULL, NULL, NULL, 'sbm_smc_oph_0005', 'sbt_smc_oph_0005', NULL, NULL, NULL, NULL, '2018-04-17 17:45:08', '2018-04-17 17:45:09', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_test_0003', '테스트 3', '테스트 3', NULL, NULL, NULL, 'sbm_smc_oph_0005', 'sbt_smc_oph_0005', NULL, NULL, NULL, NULL, '2018-04-17 17:45:08', '2018-04-17 17:45:09', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_test_0004', '테스트 4', '테스트 4', NULL, NULL, NULL, 'sbm_smc_oph_0005', 'sbt_smc_oph_0005', NULL, NULL, NULL, NULL, '2018-04-17 17:45:08', '2018-04-17 17:45:09', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_test_0005', '테스트 5', '테스트 5', NULL, NULL, NULL, 'sbm_smc_oph_0005', 'sbt_smc_oph_0005', NULL, NULL, NULL, NULL, '2018-04-17 17:45:08', '2018-04-17 17:45:09', 'admin01', 'admin01', NULL, NULL),
	('sba_smc_er_0001', 'ER 전광판 1', 'ER 전광판 1', '119.2.192.73', NULL, '', 'sbm_smc_er_0001', 'sbt_smc_er_0001', NULL, NULL, 'NORMAL', '2019-09-11 15:47:50', '2018-08-29 08:39:26', '2019-09-11 15:47:50', 'admin01', 'admin01', '2019-09-11 15:45:06.038', '2019-09-11 15:44:05.0'),
	('sba_smc_oph_0101_test', '안과 검사실 대대합 (TEST)', '안과 검사실 대대합 (TEST)', '192.168.200.2', NULL, '020000445566', 'sbm_smc_oph_0101', 'sbt_smc_oph_0101', NULL, NULL, 'NORMAL', '2019-12-20 11:36:44', '2018-10-29 16:48:35', '2019-12-20 11:36:44', 'admin01', 'admin01', '2019-12-20 11:35:48.464', '2019-12-11 18:46:34.4'),
	('sba_smc_er_0001_test', 'ER 전광판 1 (TEST)', 'ER 전광판 1 (TEST)', '119.87.11.199', NULL, 'B0F1ECBFB5AE', 'sbm_smc_er_0001', 'sbt_smc_er_0001', NULL, NULL, 'NORMAL', '2019-07-30 10:58:15', '2018-10-29 16:48:16', '2019-07-30 10:58:15', 'admin01', 'admin01', '2019-09-11 15:45:06.038', '2019-07-30 10:45:26.4'),
	('sba_smc_lab_0001', '심전도 검사실 1', '심전도 검사실 1', '203.249.216.115', NULL, '', 'sbm_smc_lab_0001', 'sbt_smc_lab_0001', NULL, NULL, 'NORMAL', '2019-09-11 15:47:32', '2018-10-28 08:39:26', '2019-09-11 15:47:32', 'admin01', 'admin01', '2019-09-11 15:48:20.902', '2019-09-11 15:47:41.0'),
	('sba_smc_lab_0001_test', '심전도 검사실 1 (TEST)', '심전도 검사실 1 (TEST)', '119.87.8.89', NULL, '10D07AABAE26', 'sbm_smc_lab_0001', 'sbt_smc_lab_0001', NULL, NULL, 'NORMAL', '2019-09-06 15:05:26', '2018-10-28 08:39:26', '2019-09-06 15:05:26', 'admin01', 'admin01', '2019-09-11 15:48:20.917', '2019-09-06 15:05:07.5'),
	('sba_smc_lab_0002_test', '폐기능 검사실 1 (TEST)', '폐기능 검사실 1 (TEST)', '192.168.44.185', NULL, '6C21A24EC2E0', 'sbm_smc_lab_0002', 'sbt_smc_lab_0002', NULL, NULL, 'NORMAL', '2019-01-30 12:46:39', NULL, '2019-01-30 12:46:39', 'admin01', 'admin01', '2019-09-11 15:48:22.433', '2019-01-30 03:43:07.7'),
	('sba_smc_lab_0002', '폐기능 검사실 1', '폐기능 검사실 1', '203.249.216.114', NULL, '', 'sbm_smc_lab_0002', 'sbt_smc_lab_0002', NULL, NULL, 'NORMAL', '2019-09-11 15:48:17', '2018-12-12 12:59:40', '2019-09-11 15:48:17', 'admin01', 'admin01', '2019-09-11 15:48:22.433', '2019-09-11 15:48:28.6'),
	('sba_smc_der_0001_test', '피부과 대대합 (TEST)', '피부과 대대합 (TEST)', '192.168.200.2', NULL, '020000445566', 'sbm_smc_der_0001', 'sbt_smc_der_0001', NULL, NULL, 'NORMAL', '2019-12-23 18:20:23', NULL, '2019-12-23 18:20:23', 'admin01', 'admin01', '2020-01-29 16:47:30.731', '2019-12-12 03:41:14.6'),
	('sba_smc_der_0001', '피부과 대대합 1', '피부과 대대합 1', '119.4.221.189', NULL, 'B0F1ECBF4A88', 'sbm_smc_der_0001', 'sbt_smc_der_0001', NULL, NULL, 'NORMAL', '2019-09-11 15:48:18', NULL, '2019-09-11 15:48:18', 'admin01', 'admin01', '2020-01-29 16:47:30.714', '2015-01-04 09:57:24.2'),
	('sba_smc_der_0002', '피부과 대대합 2', '피부과 대대합 2', '119.4.221.190', NULL, 'B0F1ECBF7EAE', 'sbm_smc_der_0001', 'sbt_smc_der_0001', NULL, NULL, 'NORMAL', '2019-09-11 15:47:32', NULL, '2019-09-11 15:47:32', 'admin01', 'admin01', '2020-01-29 16:47:30.743', '2019-09-11 15:47:14.8'),
	('sba_smc_hep_0001_test', '심장전기생리학검사실 대대합 (TEST)', '심장전기생리학검사실 대대합 (TEST)', '119.87.11.198', NULL, '10D07AABAE26', 'sbm_smc_hep_0001', 'sbt_smc_hep_0001', NULL, NULL, 'NORMAL', '2019-07-29 14:25:16', '2019-05-29 14:37:16', '2019-07-29 14:25:16', 'admin01', 'admin01', '2019-08-20 08:25:52.565', ''),
	('sba_smc_hep_0001', '심장전기생리학검사실 대대합', '심장전기생리학검사실 대대합', '119.2.200.105', NULL, '020000000000', 'sbm_smc_hep_0001', 'sbt_smc_hep_0001', NULL, NULL, 'NORMAL', '2019-09-11 15:47:42', '2019-05-29 14:37:37', '2019-09-11 15:47:42', 'admin01', 'admin01', '2019-08-20 08:25:52.565', ''),
	('sba_smc_dim_0001_test', '당뇨병센터 대대합1 전광판 (TEST)', '당뇨병센터 대대합1 전광판 (TEST)', '119.87.9.3', NULL, '10D07AABAE26', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-09 13:52:52', '2019-08-19 13:54:58', '2019-09-09 13:52:52', 'admin01', 'admin01', '2019-09-11 15:46:37.962', '2019-09-09 13:52:49.7'),
	('sba_smc_dim_0002_test', '당뇨병센터 대대합2 전광판 (TEST)', '당뇨병센터 대대합2 전광판 (TEST)', '119.87.8.221', NULL, 'B0F1ECBFA1AE', NULL, NULL, NULL, NULL, 'NORMAL', '2019-08-21 10:55:25', '2019-08-19 13:54:58', '2019-08-21 10:55:25', 'admin01', 'admin01', '2019-09-11 15:47:49.714', NULL),
	('sba_smc_dim_0003_test', '당뇨병센터 중대합1 전광판 (TEST)', '당뇨병센터 중대합1 전광판 (TEST)', '119.87.9.3', NULL, '10D07AABAE26', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:47:40', '2019-08-19 13:54:58', '2019-09-11 15:47:40', 'admin01', 'admin01', '2019-09-11 15:06:18.692', '2019-09-11 15:06:19.1'),
	('sba_smc_dim_0004_test', '당뇨병센터 중대합2 전광판 (TEST)', '당뇨병센터 중대합2 전광판 (TEST)', '119.87.9.3', NULL, '10D07AABAE26', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-09 13:57:10', '2019-08-19 13:54:58', '2019-09-09 13:57:10', 'admin01', 'admin01', '2019-09-11 15:46:37.978', '2019-09-09 13:57:09.5'),
	('sba_smc_dim_0005_test', '당뇨병센터 중대합3 전광판 (TEST)', '당뇨병센터 중대합3 전광판 (TEST)', '119.87.9.3', NULL, '10D07AABAE26', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-09 13:57:43', '2019-08-19 13:54:58', '2019-09-09 13:57:43', 'admin01', 'admin01', '2019-09-11 15:45:06.726', NULL),
	('sba_smc_dim_0006_test', '당뇨병센터 중대합4 전광판 (TEST)', '당뇨병센터 중대합4 전광판 (TEST)', '119.87.9.3', NULL, '10D07AABAE26', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-09 13:59:05', '2019-08-19 13:54:58', '2019-09-09 13:59:05', 'admin01', 'admin01', '2019-09-11 14:55:06.292', NULL),
	('sba_smc_dim_0007_test', '당뇨병센터 중대합5 전광판 (TEST)', '당뇨병센터 중대합5 전광판 (TEST)', '119.87.9.3', NULL, '10D07AABAE26', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-09 14:02:08', '2019-08-19 13:54:58', '2019-09-09 14:02:08', 'admin01', 'admin01', '2019-09-11 15:47:49.714', ''),
	('sba_smc_dim_0001', '당뇨병센터 대대합1 전광판', '당뇨병센터 대대합1 전광판', '119.2.194.125', NULL, '020000000000', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:47:35', '2019-08-19 13:54:58', '2019-09-11 15:47:35', 'admin01', 'admin01', '2019-09-11 15:46:37.978', '2019-09-11 15:46:37.5'),
	('sba_smc_dim_0002', '당뇨병센터 대대합2 전광판', '당뇨병센터 대대합2 전광판', '119.2.194.160', NULL, '020000000000', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:48:12', '2019-08-19 13:54:58', '2019-09-11 15:48:12', 'admin01', 'admin01', '2019-09-11 15:47:49.714', '2019-09-11 15:47:48.4'),
	('sba_smc_dim_0003', '당뇨병센터 중대합1 전광판', '당뇨병센터 중대합1 전광판', '119.2.194.164', NULL, '020000000000', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:47:50', '2019-08-19 13:54:58', '2019-09-11 15:47:50', 'admin01', 'admin01', '2019-09-11 15:06:18.692', '2019-09-11 15:06:17.9'),
	('sba_smc_dim_0004', '당뇨병센터 중대합2 전광판', '당뇨병센터 중대합2 전광판', '119.2.194.167', NULL, '020000000000', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:47:31', '2019-08-19 13:54:58', '2019-09-11 15:47:31', 'admin01', 'admin01', '2019-09-11 15:46:37.978', '2019-09-11 15:46:36.9'),
	('sba_smc_dim_0005', '당뇨병센터 중대합3 전광판', '당뇨병센터 중대합3 전광판', '119.2.194.168', NULL, '020000000000', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:47:45', '2019-08-19 13:54:58', '2019-09-11 15:47:45', 'admin01', 'admin01', '2019-09-11 15:45:06.726', '2019-09-11 15:45:06.0'),
	('sba_smc_dim_0006', '당뇨병센터 중대합4 전광판', '당뇨병센터 중대합4 전광판', '119.2.194.169', NULL, '020000000000', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:48:13', '2019-08-19 13:54:58', '2019-09-11 15:48:13', 'admin01', 'admin01', '2019-09-11 14:55:06.292', '2019-09-11 14:55:03.7'),
	('sba_smc_dim_0007', '당뇨병센터 중대합5 전광판', '당뇨병센터 중대합5 전광판', '119.2.194.250', NULL, '020000000000', NULL, NULL, NULL, NULL, 'NORMAL', '2019-09-11 15:47:41', '2019-08-19 13:54:58', '2019-09-11 15:47:41', 'admin01', 'admin01', '2019-09-11 15:47:49.714', '2019-09-11 15:47:06.8');
/*!40000 ALTER TABLE `sboard_agent` ENABLE KEYS */;

-- 테이블 sboard.sboard_auth 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_auth` (
  `user_id` varchar(8) NOT NULL COMMENT '사용자 ID',
  `target1` varchar(8) DEFAULT NULL COMMENT '타겟 레벨 1 (all, agent, model, template, user)',
  `target2` varchar(32) DEFAULT NULL COMMENT '타겟 레벨 2 (all, SBA_smc_oph_0001, ...)',
  `access_target` varchar(1) DEFAULT NULL COMMENT '타겟 접근 권한 (R, W)',
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='타겟별 사용자 권한';

-- 테이블 데이터 sboard.sboard_auth:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_auth` DISABLE KEYS */;
INSERT INTO `sboard_auth` (`user_id`, `target1`, `target2`, `access_target`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	('202020', 'template', 'SBT_SMC_OPH_0001_002', 'W', '2018-04-17 18:10:13', '2018-04-17 18:10:13', 'admin01', 'admin01'),
	('202020', 'template', 'SBT_SMC_OPH_0001_003', 'W', '2018-04-17 18:10:13', '2018-04-17 18:10:13', 'admin01', 'admin01'),
	('202020', 'template', 'SBT_SMC_OPH_0001_001', 'W', '2018-04-17 18:10:13', '2018-04-17 18:10:13', 'admin01', 'admin01');
/*!40000 ALTER TABLE `sboard_auth` ENABLE KEYS */;

-- 테이블 sboard.sboard_dept_mapping 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_dept_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` text DEFAULT NULL,
  `dept_name` text DEFAULT NULL,
  `room_id` text DEFAULT NULL,
  `room_name` text DEFAULT NULL,
  `agent_id` text DEFAULT NULL,
  `agent_name` text DEFAULT NULL,
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='스마트폰 데이터 조회를 위한 진료과별 저장소';

-- 테이블 데이터 sboard.sboard_dept_mapping:~6 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_dept_mapping` DISABLE KEYS */;
INSERT INTO `sboard_dept_mapping` (`id`, `dept_id`, `dept_name`, `room_id`, `room_name`, `agent_id`, `agent_name`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	(1, 'dder', '피부과', 'DDER001,DDER002,DDER003,DDER004', '1번방,2번방,3번방,4번방', 'sba_smc_der_0001_test', '대기실 앞 전광판', '2019-12-20 14:10:55', '2019-12-20 14:10:55', NULL, NULL),
	(2, 'dim', '당뇨갑상선센터', 'DIM4001,DIM4002,DIM4003,DIM4004,DIM4005', '1번방,2번방 3번방,4번방,5번방', 'sba_smc_dim_0001', '대기실 앞 전광판', '2019-12-20 14:12:05', '2019-12-20 14:12:05', NULL, NULL),
	(3, 'oph-exam', '안과검사실', NULL, NULL, 'sba_smc_oph_0101_test', '대기실 앞 전광판', '2019-12-20 14:13:18', '2019-12-20 14:13:18', NULL, NULL),
	(4, 'hep-exam', '심장전기생리학검사실', NULL, NULL, 'sba_smc_hep_0001', '대기실 앞 전광판', '2019-12-20 14:14:17', '2019-12-20 14:14:17', NULL, NULL),
	(5, 'lab-exam1', '심전도검사실', NULL, NULL, 'sba_smc_lab_0001', '대기실 앞 전광판', '2019-12-20 14:15:15', '2019-12-20 14:15:15', NULL, NULL),
	(6, 'lab-exam2', '폐기능검사실', NULL, NULL, 'sba_smc_lab_0002', '대기실 앞 전광판', '2019-12-20 14:15:44', '2019-12-20 14:15:44', NULL, NULL);
/*!40000 ALTER TABLE `sboard_dept_mapping` ENABLE KEYS */;

-- 테이블 sboard.sboard_mapping 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(64) NOT NULL COMMENT '소스 ID',
  `target` varchar(64) NOT NULL COMMENT '타겟 ID',
  `details` varchar(64) DEFAULT NULL COMMENT '설명',
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=470 DEFAULT CHARSET=utf8 COMMENT='전광판 ID 매핑 정보';

-- 테이블 데이터 sboard.sboard_mapping:~116 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_mapping` DISABLE KEYS */;
INSERT INTO `sboard_mapping` (`id`, `source`, `target`, `details`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	(1, 'DBT1000', 'sba_smc_oph_0102', '안과검사실 1 -> 안과검사실 대대합 2', '2018-06-04 21:04:13', '2018-06-04 21:04:13', 'admin01', 'admin01'),
	(2, 'DBT1001', 'sba_smc_oph_0102', '안과검사실 2 -> 안과검사실 대대합 2', '2018-06-04 21:05:09', '2018-06-04 21:05:09', 'admin01', 'admin01'),
	(3, 'DBT1002', 'sba_smc_oph_0102', '안과검사실 8 -> 안과검사실 대대합 2', '2018-06-04 21:05:32', '2018-06-04 21:05:32', 'admin01', 'admin01'),
	(4, 'DBT1003', 'sba_smc_oph_0102', '안과검사실 7 -> 안과검사실 대대합 2', '2018-06-04 21:06:11', '2018-06-04 21:06:11', 'admin01', 'admin01'),
	(5, 'DBT1004', 'sba_smc_oph_0102', '안과검사실 4 -> 안과검사실 대대합 2', '2018-06-04 21:06:54', '2018-06-04 21:06:55', 'admin01', 'admin01'),
	(6, 'DBT1005', 'sba_smc_oph_0102', '안과검사실 5 -> 안과검사실 대대합 2', '2018-06-04 21:07:14', '2018-06-04 21:07:15', 'admin01', 'admin01'),
	(7, 'DBT1006', 'sba_smc_oph_0101', '안과검사실 10 -> 안과검사실 대대합', '2018-06-04 21:52:38', '2018-06-04 21:52:38', 'admin01', 'admin01'),
	(8, 'DBT1007', 'sba_smc_oph_0101', '안과검사실 6 -> 안과검사실 대대합', '2018-06-04 21:52:49', '2018-06-04 21:52:49', 'admin01', 'admin01'),
	(9, 'DBT1008', 'sba_smc_oph_0101', '안과검사실 3 -> 안과검사실 대대합', '2018-06-04 21:53:00', '2018-06-04 21:53:00', 'admin01', 'admin01'),
	(10, 'DBT1023', 'sba_smc_oph_0101', '안과검사실 9 -> 안과검사실 대대합', '2018-06-04 21:53:08', '2018-06-04 21:53:08', 'admin01', 'admin01'),
	(11, 'DBT1000', 'sba_smc_oph_0101', '안과검사실 1 -> 안과검사실 대대합', '2018-06-04 21:04:13', '2018-06-04 21:04:13', 'admin01', 'admin01'),
	(12, 'DBT1001', 'sba_smc_oph_0101', '안과검사실 2 -> 안과검사실 대대합', '2018-06-04 21:05:09', '2018-06-04 21:05:09', 'admin01', 'admin01'),
	(13, 'DBT1002', 'sba_smc_oph_0101', '안과검사실 8 -> 안과검사실 대대합', '2018-06-04 21:05:32', '2018-06-04 21:05:32', 'admin01', 'admin01'),
	(14, 'DBT1003', 'sba_smc_oph_0101', '안과검사실 7 -> 안과검사실 대대합', '2018-06-04 21:06:11', '2018-06-04 21:06:11', 'admin01', 'admin01'),
	(15, 'DBT1004', 'sba_smc_oph_0101', '안과검사실 4 -> 안과검사실 대대합', '2018-06-04 21:06:54', '2018-06-04 21:06:55', 'admin01', 'admin01'),
	(16, 'DBT1005', 'sba_smc_oph_0101', '안과검사실 5 -> 안과검사실 대대합', '2018-06-04 21:07:14', '2018-06-04 21:07:15', 'admin01', 'admin01'),
	(17, 'DBT1006', 'sba_smc_oph_0102', '안과검사실 10 -> 안과검사실 대대합 2', '2018-06-04 21:55:45', '2018-06-04 21:55:45', 'admin01', 'admin01'),
	(18, 'DBT1007', 'sba_smc_oph_0102', '안과검사실 6 -> 안과검사실 대대합 2', '2018-06-04 21:55:47', '2018-06-04 21:55:47', 'admin01', 'admin01'),
	(19, 'DBT1008', 'sba_smc_oph_0102', '안과검사실 3 -> 안과검사실 대대합 2', '2018-06-04 21:55:49', '2018-06-04 21:55:49', 'admin01', 'admin01'),
	(20, 'DBT1023', 'sba_smc_oph_0102', '안과검사실 9 -> 안과검사실 대대합 2', '2018-06-04 21:55:58', '2018-06-04 21:55:58', 'admin01', 'admin01'),
	(21, 'DBT1088', 'sba_smc_oph_0101', '안과검사실 대대합 -> 안과검사실 대대합', '2018-06-05 09:27:49', '2018-06-05 09:27:50', 'admin01', 'admin01'),
	(22, 'DBT1088', 'sba_smc_oph_0102', '안과검사실 대대합 -> 안과검사실 대대합 2', '2018-06-05 09:27:49', '2018-06-05 09:27:50', 'admin01', 'admin01'),
	(23, 'DBT1000', 'sba_smc_oph_0101_test', '안과검사실 1 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:31:09', '2018-10-26 11:31:11', 'admin01', 'admin01'),
	(24, 'DBT1001', 'sba_smc_oph_0101_test', '안과검사실 2 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:30:27', '2018-10-26 11:30:30', 'admin01', 'admin01'),
	(25, 'DBT1008', 'sba_smc_oph_0101_test', '안과검사실 3 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:32:11', '2018-10-26 11:32:11', 'admin01', 'admin01'),
	(26, 'DBT1004', 'sba_smc_oph_0101_test', '안과검사실 4 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:32:25', '2018-10-26 11:32:25', 'admin01', 'admin01'),
	(27, 'DBT1005', 'sba_smc_oph_0101_test', '안과검사실 5 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:32:40', '2018-10-26 11:32:40', 'admin01', 'admin01'),
	(28, 'DBT1007', 'sba_smc_oph_0101_test', '안과검사실 6 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:33:14', '2018-10-26 11:33:14', 'admin01', 'admin01'),
	(29, 'DBT1003', 'sba_smc_oph_0101_test', '안과검사실 7 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:33:55', '2018-10-26 11:33:55', 'admin01', 'admin01'),
	(30, 'DBT1002', 'sba_smc_oph_0101_test', '안과검사실 8 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:34:09', '2018-10-26 11:34:09', 'admin01', 'admin01'),
	(31, 'DBT1023', 'sba_smc_oph_0101_test', '안과검사실 9 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:34:23', '2018-10-26 11:34:23', 'admin01', 'admin01'),
	(32, 'DBT1006', 'sba_smc_oph_0101_test', '안과검사실 10 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:34:38', '2018-10-26 11:34:38', 'admin01', 'admin01'),
	(33, 'DBT1088', 'sba_smc_oph_0101_test', '안과검사실 대대합 -> 안과검사실 대대합 (TEST)', '2018-10-26 11:34:49', '2018-10-26 11:34:49', 'admin01', 'admin01'),
	(34, 'UNSER001', 'sba_smc_er_0001', 'ER 전광판 1 -> ER 전광판 1', '2018-08-27 10:23:17', '2018-08-27 10:23:18', 'admin01', 'admin01'),
	(35, 'UNSER001', 'sba_smc_er_0001_test', 'ER 전광판 1 -> ER 전광판 1 (TEST)', '2018-08-27 10:23:18', '2018-08-27 10:23:19', 'admin01', 'admin01'),
	(36, 'DBSB410', 'sba_smc_lab_0001', '심전도검사실 1 -> 심전도검사실 1', '2018-10-28 08:39:26', '2018-10-28 21:25:33', 'admin01', 'admin01'),
	(37, 'DBSB410', 'sba_smc_lab_0001_test', '심전도검사실 1 -> 심전도검사실 1 (TEST)', '2018-10-28 08:39:26', '2018-10-28 21:25:33', 'admin01', 'admin01'),
	(38, 'DBSB400', 'sba_smc_lab_0002', '폐기능검사실 1 -> 폐기능검사실 1', '2018-12-12 12:55:26', '2018-12-12 12:55:26', 'admin01', 'admin01'),
	(39, 'DBSB400', 'sba_smc_lab_0002_test', '폐기능검사실 1 -> 폐기능검사실 1 (TEST)', '2018-12-12 12:55:53', '2018-12-12 12:55:53', 'admin01', 'admin01'),
	(393, 'DDER999', 'sba_smc_der_0001', '피부과 999 -> 피부과 대대합 1', '2019-03-05 13:36:08', '2019-03-05 13:36:08', 'admin01', 'admin01'),
	(394, 'DDER001', 'sba_smc_der_0001', '피부과 1 -> 피부과 대대합 1', '2019-03-05 13:37:54', '2019-03-05 13:37:54', 'admin01', 'admin01'),
	(395, 'DDER002', 'sba_smc_der_0001', '피부과 2 -> 피부과 대대합 1', '2019-03-05 13:38:24', '2019-03-05 13:38:24', 'admin01', 'admin01'),
	(396, 'DDER003', 'sba_smc_der_0001', '피부과 3 -> 피부과 대대합 1', '2019-03-05 13:38:49', '2019-03-05 13:38:49', 'admin01', 'admin01'),
	(397, 'DDER004', 'sba_smc_der_0001', '피부과 4 -> 피부과 대대합 1', '2019-03-05 13:39:18', '2019-03-05 13:39:18', 'admin01', 'admin01'),
	(398, 'DDER999', 'sba_smc_der_0001_test', '피부과 999 -> 피부과 대대합 (TEST)', '2019-03-05 13:43:31', '2019-03-05 13:43:31', 'admin01', 'admin01'),
	(399, 'DDER001', 'sba_smc_der_0001_test', '피부과 1 -> 피부과 대대합 (TEST)', '2019-03-05 13:43:44', '2019-03-05 13:43:44', 'admin01', 'admin01'),
	(400, 'DDER002', 'sba_smc_der_0001_test', '피부과 2 -> 피부과 대대합 (TEST)', '2019-03-05 13:43:52', '2019-03-05 13:43:52', 'admin01', 'admin01'),
	(401, 'DDER003', 'sba_smc_der_0001_test', '피부과 3 -> 피부과 대대합 (TEST)', '2019-03-05 13:43:59', '2019-03-05 13:43:59', 'admin01', 'admin01'),
	(402, 'DDER004', 'sba_smc_der_0001_test', '피부과 4 -> 피부과 대대합 (TEST)', '2019-03-05 13:44:09', '2019-03-05 13:44:09', 'admin01', 'admin01'),
	(403, 'DDER999', 'sba_smc_der_0002', '피부과 999 -> 피부과 대대합 2', '2019-04-05 18:54:13', '2019-04-05 18:54:13', 'admin01', 'admin01'),
	(404, 'DDER001', 'sba_smc_der_0002', '피부과 1 -> 피부과 대대합 2', '2019-04-05 18:54:43', '2019-04-05 18:54:43', 'admin01', 'admin01'),
	(405, 'DDER002', 'sba_smc_der_0002', '피부과 2 -> 피부과 대대합 2', '2019-04-05 18:54:58', '2019-04-05 18:54:58', 'admin01', 'admin01'),
	(406, 'DDER003', 'sba_smc_der_0002', '피부과 3 -> 피부과 대대합 2', '2019-04-05 18:55:17', '2019-04-05 18:55:17', 'admin01', 'admin01'),
	(407, 'DDER004', 'sba_smc_der_0002', '피부과 4 -> 피부과 대대합 2', '2019-04-05 18:55:32', '2019-04-05 18:55:32', 'admin01', 'admin01'),
	(408, 'DBS2800', 'sba_smc_hep_0001', '심장전기생리학검사실 대기자 -> 심장전기생리학검사실 대대합', '2019-05-29 14:24:12', '2019-05-29 14:24:12', 'admin01', 'admin01'),
	(409, 'DBS2801', 'sba_smc_hep_0001', '심장전기생리학검사실 1 -> 심장전기생리학검사실 대대합', '2019-05-29 14:24:48', '2019-05-29 14:24:48', 'admin01', 'admin01'),
	(410, 'DBS2802', 'sba_smc_hep_0001', '심장전기생리학검사실 2 -> 심장전기생리학검사실 대대합', '2019-05-29 14:25:23', '2019-05-29 14:25:23', 'admin01', 'admin01'),
	(411, 'DBS2800', 'sba_smc_hep_0001_test', '심장전기생리학검사실 대기자 -> 심장전기생리학검사실 대대합 (TEST)', '2019-05-29 14:29:40', '2019-05-29 14:29:40', 'admin01', 'admin01'),
	(412, 'DBS2801', 'sba_smc_hep_0001_test', '심장전기생리학검사실 1 -> 심장전기생리학검사실 대대합 (TEST)', '2019-05-29 14:29:55', '2019-05-29 14:29:55', 'admin01', 'admin01'),
	(413, 'DBS2802', 'sba_smc_hep_0001_test', '심장전기생리학검사실 2 -> 심장전기생리학검사실 대대합 (TEST)', '2019-05-29 14:30:05', '2019-05-29 14:30:05', 'admin01', 'admin01'),
	(414, 'DIM4001', 'sba_smc_dim_0001_test', '당뇨병센터 1 -> 당뇨병센터 대대합 1 (TEST)', '2019-08-19 14:53:28', '2019-08-19 14:53:28', 'admin01', 'admin01'),
	(415, 'DIM4002', 'sba_smc_dim_0001_test', '당뇨병센터 2 -> 당뇨병센터 대대합 1 (TEST)', '2019-08-19 14:54:38', '2019-08-19 14:54:38', 'admin01', 'admin01'),
	(416, 'DIM4003', 'sba_smc_dim_0001_test', '당뇨병센터 3 -> 당뇨병센터 대대합 1 (TEST)', '2019-08-19 14:55:26', '2019-08-19 14:55:26', 'admin01', 'admin01'),
	(417, 'DIM4004', 'sba_smc_dim_0001_test', '당뇨병센터 4 -> 당뇨병센터 대대합 1 (TEST)', '2019-08-19 14:55:41', '2019-08-19 14:55:41', 'admin01', 'admin01'),
	(418, 'DIM4005', 'sba_smc_dim_0001_test', '당뇨병센터 5 -> 당뇨병센터 대대합 1 (TEST)', '2019-08-19 14:56:01', '2019-08-19 14:56:01', 'admin01', 'admin01'),
	(419, 'DIM4900', 'sba_smc_dim_0001_test', '당뇨병센터 대대합 -> 당뇨병센터 대대합 1 (TEST)', '2019-08-19 14:56:32', '2019-08-19 14:59:33', 'admin01', 'admin01'),
	(420, 'DIM4006', 'sba_smc_dim_0002_test', '당뇨병센터 6 -> 당뇨병센터 대대합 2 (TEST)', '2019-08-19 14:56:36', '2019-08-19 14:56:36', 'admin01', 'admin01'),
	(421, 'DIM4007', 'sba_smc_dim_0002_test', '당뇨병센터 7 -> 당뇨병센터 대대합 2 (TEST)', '2019-08-19 14:57:22', '2019-08-19 14:57:22', 'admin01', 'admin01'),
	(422, 'DIM4008', 'sba_smc_dim_0002_test', '당뇨병센터 8 -> 당뇨병센터 대대합 2 (TEST)', '2019-08-19 14:57:45', '2019-08-19 14:57:45', 'admin01', 'admin01'),
	(423, 'DIM4009', 'sba_smc_dim_0002_test', '당뇨병센터 9 -> 당뇨병센터 대대합 2 (TEST)', '2019-08-19 14:58:06', '2019-08-19 14:58:06', 'admin01', 'admin01'),
	(424, 'DIM4010', 'sba_smc_dim_0002_test', '당뇨병센터 10 -> 당뇨병센터 대대합 2 (TEST)', '2019-08-19 14:58:45', '2019-08-19 14:58:45', 'admin01', 'admin01'),
	(425, 'DIM4900', 'sba_smc_dim_0002_test', '당뇨병센터 대대합 -> 당뇨병센터 대대합 2 (TEST)', '2019-08-19 15:02:46', '2019-08-19 15:02:46', 'admin01', 'admin01'),
	(426, 'DIM4001', 'sba_smc_dim_0003_test', '당뇨병센터 1 -> 당뇨병센터 중대합 1 (TEST)', '2019-08-19 15:05:28', '2019-08-19 15:05:28', 'admin01', 'admin01'),
	(427, 'DIM4002', 'sba_smc_dim_0003_test', '당뇨병센터 2 -> 당뇨병센터 중대합 1 (TEST)', '2019-08-19 15:06:18', '2019-08-19 15:06:18', 'admin01', 'admin01'),
	(428, 'DIM4003', 'sba_smc_dim_0003_test', '당뇨병센터 3 -> 당뇨병센터 중대합 1 (TEST)', '2019-08-19 15:06:41', '2019-08-19 15:06:41', 'admin01', 'admin01'),
	(429, 'DIM4800', 'sba_smc_dim_0003_test', '당뇨병센터 중대합 -> 당뇨병센터 중대합 1 (TEST)', '2019-08-19 15:10:12', '2019-08-19 15:10:12', 'admin01', 'admin01'),
	(430, 'DIM4004', 'sba_smc_dim_0004_test', '당뇨병센터 4 -> 당뇨병센터 중대합 2 (TEST)', '2019-08-19 15:07:03', '2019-08-19 15:07:03', 'admin01', 'admin01'),
	(431, 'DIM4005', 'sba_smc_dim_0004_test', '당뇨병센터 5 -> 당뇨병센터 중대합 2 (TEST)', '2019-08-19 15:07:35', '2019-08-19 15:07:35', 'admin01', 'admin01'),
	(432, 'DIM4800', 'sba_smc_dim_0004_test', '당뇨병센터 중대합 -> 당뇨병센터 중대합 2 (TEST)', '2019-08-19 15:11:00', '2019-08-19 15:11:00', 'admin01', 'admin01'),
	(433, 'DIM4006', 'sba_smc_dim_0005_test', '당뇨병센터 6 -> 당뇨병센터 중대합 3 (TEST)', '2019-08-19 15:08:28', '2019-08-19 15:08:28', 'admin01', 'admin01'),
	(434, 'DIM4007', 'sba_smc_dim_0005_test', '당뇨병센터 7 -> 당뇨병센터 중대합 3 (TEST)', '2019-08-19 15:08:58', '2019-08-19 15:08:58', 'admin01', 'admin01'),
	(435, 'DIM4800', 'sba_smc_dim_0005_test', '당뇨병센터 중대합 -> 당뇨병센터 중대합 3 (TEST)', '2019-08-19 15:12:12', '2019-08-19 15:12:12', 'admin01', 'admin01'),
	(436, 'DIM4008', 'sba_smc_dim_0006_test', '당뇨병센터 8 -> 당뇨병센터 중대합 4 (TEST)', '2019-08-19 15:13:10', '2019-08-19 15:13:10', 'admin01', 'admin01'),
	(437, 'DIM4009', 'sba_smc_dim_0006_test', '당뇨병센터 9 -> 당뇨병센터 중대합 4 (TEST)', '2019-08-19 15:13:32', '2019-08-19 15:13:32', 'admin01', 'admin01'),
	(438, 'DIM4800', 'sba_smc_dim_0006_test', '당뇨병센터 중대합 -> 당뇨병센터 중대합 4 (TEST)', '2019-08-19 15:14:43', '2019-08-19 15:14:43', 'admin01', 'admin01'),
	(439, 'DIM4010', 'sba_smc_dim_0007_test', '당뇨병센터 10 -> 당뇨병센터 중대합 5 (TEST)', '2019-08-19 15:15:29', '2019-08-19 15:15:29', 'admin01', 'admin01'),
	(440, 'DIM4001', 'sba_smc_dim_0007_test', '당뇨병센터 1 -> 당뇨병센터 중대합 5 (TEST)', '2019-08-19 15:16:15', '2019-08-19 15:16:15', 'admin01', 'admin01'),
	(441, 'DIM4800', 'sba_smc_dim_0007_test', '당뇨병센터 중대합 -> 당뇨병센터 중대합 5 (TEST)', '2019-08-19 15:16:50', '2019-08-19 15:16:50', 'admin01', 'admin01'),
	(442, 'DIM4001', 'sba_smc_dim_0001', '당뇨병센터 1 -> 당뇨병센터 대대합 1', '2019-08-19 15:19:23', '2019-08-19 15:19:23', 'admin01', 'admin01'),
	(443, 'DIM4002', 'sba_smc_dim_0001', '당뇨병센터 2 -> 당뇨병센터 대대합 1', '2019-08-19 15:19:39', '2019-08-19 15:19:39', 'admin01', 'admin01'),
	(444, 'DIM4003', 'sba_smc_dim_0001', '당뇨병센터 3 -> 당뇨병센터 대대합 1', '2019-08-19 15:19:51', '2019-08-19 15:19:51', 'admin01', 'admin01'),
	(445, 'DIM4004', 'sba_smc_dim_0001', '당뇨병센터 4 -> 당뇨병센터 대대합 1', '2019-08-19 15:20:01', '2019-08-19 15:20:01', 'admin01', 'admin01'),
	(446, 'DIM4005', 'sba_smc_dim_0001', '당뇨병센터 5 -> 당뇨병센터 대대합 1', '2019-08-19 15:20:09', '2019-08-19 15:20:09', 'admin01', 'admin01'),
	(447, 'DIM4900', 'sba_smc_dim_0001', '당뇨병센터 대대합 -> 당뇨병센터 대대합 1', '2019-08-19 15:20:28', '2019-08-19 15:20:28', 'admin01', 'admin01'),
	(448, 'DIM4006', 'sba_smc_dim_0002', '당뇨병센터 6 -> 당뇨병센터 대대합 2', '2019-08-19 15:20:43', '2019-08-19 15:20:43', 'admin01', 'admin01'),
	(449, 'DIM4007', 'sba_smc_dim_0002', '당뇨병센터 7 -> 당뇨병센터 대대합 2', '2019-08-19 15:20:57', '2019-08-19 15:20:57', 'admin01', 'admin01'),
	(450, 'DIM4008', 'sba_smc_dim_0002', '당뇨병센터 8 -> 당뇨병센터 대대합 2', '2019-08-19 15:21:09', '2019-08-19 15:21:09', 'admin01', 'admin01'),
	(451, 'DIM4009', 'sba_smc_dim_0002', '당뇨병센터 9 -> 당뇨병센터 대대합 2', '2019-08-19 15:21:27', '2019-08-19 15:21:27', 'admin01', 'admin01'),
	(452, 'DIM4010', 'sba_smc_dim_0002', '당뇨병센터 10 -> 당뇨병센터 대대합 2', '2019-08-19 15:21:41', '2019-08-19 15:21:41', 'admin01', 'admin01'),
	(453, 'DIM4900', 'sba_smc_dim_0002', '당뇨병센터 대대합 -> 당뇨병센터 대대합 2', '2019-08-19 15:21:54', '2019-08-19 15:21:54', 'admin01', 'admin01'),
	(454, 'DIM4001', 'sba_smc_dim_0003', '당뇨병센터 1 -> 당뇨병센터 중대합 1', '2019-08-19 15:22:07', '2019-08-19 15:22:07', 'admin01', 'admin01'),
	(455, 'DIM4002', 'sba_smc_dim_0003', '당뇨병센터 2 -> 당뇨병센터 중대합 1', '2019-08-19 15:22:20', '2019-08-19 15:22:20', 'admin01', 'admin01'),
	(456, 'DIM4003', 'sba_smc_dim_0003', '당뇨병센터 3 -> 당뇨병센터 중대합 1', '2019-08-19 15:22:35', '2019-08-19 15:22:35', 'admin01', 'admin01'),
	(457, 'DIM4800', 'sba_smc_dim_0003', '당뇨병센터 중대합 -> 당뇨병센터 중대합 1', '2019-08-19 15:22:52', '2019-08-19 15:22:52', 'admin01', 'admin01'),
	(458, 'DIM4004', 'sba_smc_dim_0004', '당뇨병센터 4 -> 당뇨병센터 중대합 2', '2019-08-19 15:23:11', '2019-08-19 15:23:11', 'admin01', 'admin01'),
	(459, 'DIM4005', 'sba_smc_dim_0004', '당뇨병센터 5 -> 당뇨병센터 중대합 2', '2019-08-19 15:23:25', '2019-08-19 15:23:25', 'admin01', 'admin01'),
	(460, 'DIM4800', 'sba_smc_dim_0004', '당뇨병센터 중대합 -> 당뇨병센터 중대합 2', '2019-08-19 15:23:37', '2019-08-19 15:23:37', 'admin01', 'admin01'),
	(461, 'DIM4006', 'sba_smc_dim_0005', '당뇨병센터 6 -> 당뇨병센터 중대합 3', '2019-08-19 15:23:52', '2019-08-19 15:23:52', 'admin01', 'admin01'),
	(462, 'DIM4007', 'sba_smc_dim_0005', '당뇨병센터 7 -> 당뇨병센터 중대합 3', '2019-08-19 15:24:09', '2019-08-19 15:24:09', 'admin01', 'admin01'),
	(463, 'DIM4800', 'sba_smc_dim_0005', '당뇨병센터 중대합 -> 당뇨병센터 중대합 3', '2019-08-19 15:24:23', '2019-08-19 15:24:23', 'admin01', 'admin01'),
	(464, 'DIM4008', 'sba_smc_dim_0006', '당뇨병센터 8 -> 당뇨병센터 중대합 4', '2019-08-19 15:24:37', '2019-08-19 15:24:37', 'admin01', 'admin01'),
	(465, 'DIM4009', 'sba_smc_dim_0006', '당뇨병센터 9 -> 당뇨병센터 중대합 4', '2019-08-19 15:24:50', '2019-08-19 15:24:50', 'admin01', 'admin01'),
	(466, 'DIM4800', 'sba_smc_dim_0006', '당뇨병센터 중대합 -> 당뇨병센터 중대합 4', '2019-08-19 15:25:02', '2019-08-19 15:25:02', 'admin01', 'admin01'),
	(467, 'DIM4010', 'sba_smc_dim_0007', '당뇨병센터 10 -> 당뇨병센터 중대합 5', '2019-08-19 15:25:14', '2019-08-19 15:25:14', 'admin01', 'admin01'),
	(468, 'DIM4001', 'sba_smc_dim_0007', '당뇨병센터 1 -> 당뇨병센터 중대합 5', '2019-08-19 15:25:26', '2019-08-19 15:25:26', 'admin01', 'admin01'),
	(469, 'DIM4800', 'sba_smc_dim_0007', '당뇨병센터 중대합 -> 당뇨병센터 중대합 5', '2019-08-19 15:25:36', '2019-08-19 15:25:36', 'admin01', 'admin01');
/*!40000 ALTER TABLE `sboard_mapping` ENABLE KEYS */;

-- 테이블 sboard.sboard_model 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_model` (
  `id` varchar(32) NOT NULL COMMENT '모델 ID',
  `name` varchar(64) DEFAULT NULL COMMENT '모델 이름',
  `details` varchar(64) DEFAULT NULL COMMENT '모델 설명',
  `filename` varchar(64) DEFAULT NULL COMMENT '모델 파일명',
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='모델';

-- 테이블 데이터 sboard.sboard_model:~17 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_model` DISABLE KEYS */;
INSERT INTO `sboard_model` (`id`, `name`, `details`, `filename`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	('sbm_smc_der_0001', '피부과 대대합 모델', '피부과 대대합 모델', 'sbm_smc_der_0001', '2019-03-05 13:32:50', '2019-03-05 13:32:50', 'admin01', 'admin01'),
	('sbm_smc_dim_0001', '당뇨병센터 대대합 1 모델', '당뇨병센터 대대합 1 모델', 'sbm_smc_dim_0001', '2019-08-19 13:50:47', '2019-08-19 13:50:47', 'admin01', 'admin01'),
	('sbm_smc_dim_0002', '당뇨병센터 대대합 2 모델', '당뇨병센터 대대합 2 모델', 'sbm_smc_dim_0002', '2019-08-19 13:50:50', '2019-08-19 13:50:50', 'admin01', 'admin01'),
	('sbm_smc_dim_0003', '당뇨병센터 중대합 1 모델', '당뇨병센터 중대합 1 모델', 'sbm_smc_dim_0003', '2019-08-19 13:50:52', '2019-08-19 13:50:52', 'admin01', 'admin01'),
	('sbm_smc_dim_0004', '당뇨병센터 중대합 2 모델', '당뇨병센터 중대합 2 모델', 'sbm_smc_dim_0004', '2019-08-19 13:50:56', '2019-08-19 13:50:56', 'admin01', 'admin01'),
	('sbm_smc_dim_0005', '당뇨병센터 중대합 3 모델', '당뇨병센터 중대합 3 모델', 'sbm_smc_dim_0005', '2019-08-19 13:50:59', '2019-08-19 13:50:59', 'admin01', 'admin01'),
	('sbm_smc_dim_0006', '당뇨병센터 중대합 4 모델', '당뇨병센터 중대합 4 모델', 'sbm_smc_dim_0006', '2019-08-19 13:51:01', '2019-08-19 13:51:01', 'admin01', 'admin01'),
	('sbm_smc_dim_0007', '당뇨병센터 중대합 5 모델', '당뇨병센터 중대합 5 모델', 'sbm_smc_dim_0007', '2019-08-19 13:51:05', '2019-08-19 13:51:05', 'admin01', 'admin01'),
	('sbm_smc_er_0001', 'ER 전광판 1 모델', 'ER 전광판 1 모델', 'sbm_smc_er_0001', '2018-06-26 16:01:54', '2018-06-26 16:01:54', 'admin01', 'admin01'),
	('sbm_smc_hep_0001', '심장전기생리학검사실 대대합 모델', '심장전기생리학검사실 대대합 모델', 'sbm_smc_hep_0001', '2019-05-29 14:20:42', '2019-05-29 14:20:42', 'admin01', 'admin01'),
	('sbm_smc_lab_0001', '심전도 검사실 1 모델', '심전도 검사실 1 모델', 'sbm_smc_lab_0001', '2018-10-28 08:39:26', '2018-10-28 21:25:33', 'admin01', 'admin01'),
	('sbm_smc_lab_0002', '폐기능 검사실 1 모델', '폐기능 검사실 1 모델', 'sbm_smc_lab_0002', '2018-12-12 12:52:51', '2018-12-12 12:52:51', 'admin01', 'admin01'),
	('sbm_smc_oph_0001', '안과 대대합 모델', '안과 대대합 모델', 'sbm_smc_oph_0001', '2018-04-17 17:49:22', '2018-04-17 17:49:22', 'admin01', 'admin01'),
	('sbm_smc_oph_0002', 'CT 치료실 모델', 'CT 치료실 모델', 'sbm_smc_oph_0002', '2018-04-17 17:49:22', '2018-04-17 17:49:22', 'admin01', 'admin01'),
	('sbm_smc_oph_0004', '안과 검사실 1 모델', '안과 검사실 1 모델', 'sbm_smc_oph_0004', '2018-04-17 17:49:22', '2018-04-17 17:49:22', 'admin01', 'admin01'),
	('sbm_smc_oph_0005', '안과 검사실 2 모델', '안과 검사실 2 모델', 'sbm_smc_oph_0005', '2018-04-17 17:49:22', '2018-04-17 17:49:22', 'admin01', 'admin01'),
	('sbm_smc_oph_0101', '안과 검사실 대대합 모델', '안과 검사실 대대합 모델', 'sbm_smc_oph_0101', '2018-04-17 17:49:22', '2018-04-17 17:49:22', 'admin01', 'admin01');
/*!40000 ALTER TABLE `sboard_model` ENABLE KEYS */;

-- 테이블 sboard.sboard_room_data 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_room_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` text DEFAULT NULL,
  `room_name` text DEFAULT NULL,
  `doctor_name` text DEFAULT NULL,
  `delay_time` text DEFAULT NULL,
  `delay_reason` text DEFAULT NULL,
  `ongoing_name` text DEFAULT NULL,
  `waiting_name1` text DEFAULT NULL,
  `waiting_name2` text DEFAULT NULL,
  `waiting_name3` text DEFAULT NULL,
  `waiting_name4` text DEFAULT NULL,
  `waiting_name5` text DEFAULT NULL,
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='스마트폰 데이터 조회를 위한 데이터 저장소';

-- 테이블 데이터 sboard.sboard_room_data:~11 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_room_data` DISABLE KEYS */;
INSERT INTO `sboard_room_data` (`id`, `room_id`, `room_name`, `doctor_name`, `delay_time`, `delay_reason`, `ongoing_name`, `waiting_name1`, `waiting_name2`, `waiting_name3`, `waiting_name4`, `waiting_name5`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	(2, 'DDER001', '1번방', '양준모', '30', '', '라슬영', '설기영', '동현슬', '윤사익', '하경령', '하하미', '2019-12-15 13:29:40', '2019-12-15 13:29:40', NULL, NULL),
	(3, 'DDER002', '2번방', '박찬성', '0', '', '', '전슬령', '표기익', '', '', '', '2019-12-15 22:36:33', '2019-12-15 22:36:33', NULL, NULL),
	(4, 'DBT1001', '', '', '', '', '', '', '', '', '', '', '2019-12-17 19:12:09', '2019-12-17 19:12:09', NULL, NULL),
	(5, 'DBT1002', '', '', '', '', '', '', '', '', '', '', '2019-12-17 20:18:08', '2019-12-17 20:18:08', NULL, NULL),
	(6, 'DBT1003', '', '', '', '', '', '', '', '', '', '', '2019-12-17 20:45:06', '2019-12-17 20:45:06', NULL, NULL),
	(7, 'DBT1006', '', '', '', '', '', '', '', '', '', '', '2019-12-17 20:47:14', '2019-12-17 20:47:14', NULL, NULL),
	(8, 'DBT1007', '', '', '', '', '', '', '', '', '', '', '2019-12-17 20:48:19', '2019-12-17 20:48:19', NULL, NULL),
	(9, 'DBT1008', '', '', '', '', '', '', '', '', '', '', '2019-12-17 20:49:13', '2019-12-17 20:49:13', NULL, NULL),
	(10, 'DBT1004', '', '', '', '', '', '', '', '', '', '', '2019-12-17 20:58:06', '2019-12-17 20:58:06', NULL, NULL),
	(11, 'DDER003', '3번방', '', '0', '', '', '', '', '', '', '', '2019-12-20 16:38:44', '2019-12-20 16:38:44', NULL, NULL),
	(12, 'DDER004', '4번방', '', '0', '', '', '', '', '', '', '', '2019-12-20 16:39:15', '2019-12-20 16:39:15', NULL, NULL);
/*!40000 ALTER TABLE `sboard_room_data` ENABLE KEYS */;

-- 테이블 sboard.sboard_room_mapping 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_room_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` text DEFAULT NULL,
  `agent_id` text DEFAULT NULL,
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='스마트폰 조회를 위한 roomId -> agentId 매핑';

-- 테이블 데이터 sboard.sboard_room_mapping:~11 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_room_mapping` DISABLE KEYS */;
INSERT INTO `sboard_room_mapping` (`id`, `room_id`, `agent_id`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	(1, 'DDER001', 'sba_smc_der_0001_test', '2019-12-15 11:37:10', '2019-12-15 11:37:11', NULL, NULL),
	(2, 'DDER002', 'sba_smc_der_0001_test', '2019-12-15 22:25:23', '2019-12-15 22:25:23', NULL, NULL),
	(3, 'DBT1001', 'sba_smc_oph_0101_test', '2019-12-17 19:12:09', '2019-12-17 19:12:09', NULL, NULL),
	(4, 'DBT1002', 'sba_smc_oph_0101_test', '2019-12-17 20:18:08', '2019-12-17 20:18:08', NULL, NULL),
	(5, 'DBT1003', 'sba_smc_oph_0101_test', '2019-12-17 20:45:06', '2019-12-17 20:45:06', NULL, NULL),
	(6, 'DBT1006', 'sba_smc_oph_0101_test', '2019-12-17 20:47:13', '2019-12-17 20:47:13', NULL, NULL),
	(7, 'DBT1007', 'sba_smc_oph_0101_test', '2019-12-17 20:48:19', '2019-12-17 20:48:19', NULL, NULL),
	(8, 'DBT1008', 'sba_smc_oph_0101_test', '2019-12-17 20:49:13', '2019-12-17 20:49:13', NULL, NULL),
	(9, 'DBT1004', 'sba_smc_oph_0101_test', '2019-12-17 20:58:05', '2019-12-17 20:58:05', NULL, NULL),
	(10, 'DDER003', 'sba_smc_der_0001_test', '2019-12-20 16:38:44', '2019-12-20 16:38:44', NULL, NULL),
	(11, 'DDER004', 'sba_smc_der_0001_test', '2019-12-20 16:39:15', '2019-12-20 16:39:15', NULL, NULL);
/*!40000 ALTER TABLE `sboard_room_mapping` ENABLE KEYS */;

-- 테이블 sboard.sboard_template 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_template` (
  `id` varchar(32) NOT NULL COMMENT '템플레이트 ID',
  `name` varchar(64) DEFAULT NULL COMMENT '템플레이트 이름',
  `details` varchar(64) DEFAULT NULL COMMENT '템플레이트 설명',
  `filename` varchar(64) DEFAULT NULL COMMENT '템플레이트 파일명 (메인 파일)',
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='템플레이트';

-- 테이블 데이터 sboard.sboard_template:~17 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_template` DISABLE KEYS */;
INSERT INTO `sboard_template` (`id`, `name`, `details`, `filename`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	('sbt_smc_oph_0001', '안과 대대합 템플레이트', '안과 대대합 화면 레이아웃', 'sbt_smc_oph_0001', '2018-04-17 17:55:15', '2018-04-17 17:55:15', 'admin01', 'admin01'),
	('sbt_smc_oph_0002', 'CT 치료실 템플레이트', 'CT 치료실 화면 레이아웃', 'sbt_smc_oph_0002', '2018-04-17 17:55:15', '2018-04-17 17:55:15', 'admin01', 'admin01'),
	('sbt_smc_oph_0101', '안과 검사실 대대합 템플레이트', '안과 검사실 대대합 화면 레이아웃', 'sbt_smc_oph_0101', '2018-04-17 17:55:15', '2018-04-17 17:55:15', 'admin01', 'admin01'),
	('sbt_smc_oph_0004', '안과 검사실 1 템플레이트', '안과 검사실 1 화면 레이아웃', 'sbt_smc_oph_0004', '2018-04-17 17:55:15', '2018-04-17 17:55:15', 'admin01', 'admin01'),
	('sbt_smc_oph_0005', '안과 검사실 2 템플레이트', '안과 검사실 2 화면 레이아웃', 'sbt_smc_oph_0005', '2018-04-17 17:55:15', '2018-04-17 17:55:15', 'admin01', 'admin01'),
	('sbt_smc_er_0001', 'ER 전광판 1 템플레이트', 'ER 전광판 1 화면 레이아웃', 'sbt_smc_er_0001', '2018-06-26 15:34:58', '2018-06-26 15:34:58', 'admin01', 'admin01'),
	('sbt_smc_lab_0001', '심전도 검사실 1 템플레이트', '심전도 검사실 1 화면 레이아웃', 'sbt_smc_lab_0001', '2018-10-28 08:39:26', '2018-10-28 21:25:33', 'admin01', 'admin01'),
	('sbt_smc_lab_0002', '폐기능 검사실 1 템플레이트', '폐기능 검사실 1 화면 레이아웃', 'sbt_smc_lab_0002', '2018-12-12 12:51:41', '2018-12-12 12:51:41', 'admin01', 'admin01'),
	('sbt_smc_der_0001', '피부과 대대합 템플레이트', '피부과 대대합 화면 레이아웃', 'sbt_smc_der_0001', '2019-03-05 13:31:21', '2019-03-05 13:31:21', 'admin01', 'admin01'),
	('sbt_smc_hep_0001', '심장전기생리학검사실 대대합 템플레이트', '심장전기생리학검사실 대대합 화면 레이아웃', 'sbt_smc_hep_0001', '2019-05-29 14:14:46', '2019-05-29 14:14:46', 'admin01', 'admin01'),
	('sbt_smc_dim_0001', '당뇨병센터 대대합 1 템플레이트', '당뇨병센터 대대합 1 화면 레이아웃', 'sbt_smc_dim_0001', '2019-08-19 13:46:53', '2019-08-19 13:46:53', 'admin01', 'admin01'),
	('sbt_smc_dim_0002', '당뇨병센터 대대합 2 템플레이트', '당뇨병센터 대대합 2 화면 레이아웃', 'sbt_smc_dim_0002', '2019-08-19 13:47:06', '2019-08-19 13:47:06', 'admin01', 'admin01'),
	('sbt_smc_dim_0003', '당뇨병센터 중대합 1 템플레이트', '당뇨병센터 중대합 1 화면 레이아웃', 'sbt_smc_dim_0003', '2019-08-19 13:47:11', '2019-08-19 13:47:11', 'admin01', 'admin01'),
	('sbt_smc_dim_0004', '당뇨병센터 중대합 2 템플레이트', '당뇨병센터 중대합 2 화면 레이아웃', 'sbt_smc_dim_0004', '2019-08-19 13:47:16', '2019-08-19 13:47:16', 'admin01', 'admin01'),
	('sbt_smc_dim_0005', '당뇨병센터 중대합 3 템플레이트', '당뇨병센터 중대합 3 화면 레이아웃', 'sbt_smc_dim_0005', '2019-08-19 13:47:20', '2019-08-19 13:47:20', 'admin01', 'admin01'),
	('sbt_smc_dim_0006', '당뇨병센터 중대합 4 템플레이트', '당뇨병센터 중대합 4 화면 레이아웃', 'sbt_smc_dim_0006', '2019-08-19 13:47:23', '2019-08-19 13:47:23', 'admin01', 'admin01'),
	('sbt_smc_dim_0007', '당뇨병센터 중대합 5 템플레이트', '당뇨병센터 중대합 5 화면 레이아웃', 'sbt_smc_dim_0007', '2019-08-19 13:47:29', '2019-08-19 13:47:29', 'admin01', 'admin01');
/*!40000 ALTER TABLE `sboard_template` ENABLE KEYS */;

-- 테이블 sboard.sboard_template_file 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_template_file` (
  `id` varchar(32) NOT NULL COMMENT '템플레이트 파일 ID',
  `name` varchar(64) DEFAULT NULL COMMENT '템플레이트 파일 이름',
  `details` varchar(64) DEFAULT NULL COMMENT '템플레이트 파일 설명',
  `template_id` varchar(32) DEFAULT NULL COMMENT '템플레이트 ID',
  `filename` varchar(64) DEFAULT NULL COMMENT '템플레이트 소속 파일명',
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='템플레이트에 소속된 파일 정보';

-- 테이블 데이터 sboard.sboard_template_file:~22 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_template_file` DISABLE KEYS */;
INSERT INTO `sboard_template_file` (`id`, `name`, `details`, `template_id`, `filename`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	('sbt_smc_oph_0001_page0', '안과 대대합 page0', '안과 대대합 메인', 'sbt_smc_oph_0001', 'sbt_smc_oph_0001_page0', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0001_page1', '안과 대대합 page1', '안과 대대합 하단', 'sbt_smc_oph_0001', 'sbt_smc_oph_0001_page1', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0002_page0', 'CT 치료실 page0', 'CT 치료실 메인', 'sbt_smc_oph_0002', 'sbt_smc_oph_0002_page0', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0101_page0', '안과 검사실 대대합 page0', '안과 검사실 대대합 메인', 'sbt_smc_oph_0101', 'sbt_smc_oph_0101_page0', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0004_page0', '안과 검사실 1  page0', '안과 검사실 1 메인', 'sbt_smc_oph_0004', 'sbt_smc_oph_0004_page0', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0005_page0', '안과 검사실 2 page0', '안과 검사실 2 메인', 'sbt_smc_oph_0005', 'sbt_smc_oph_0005_page0', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0002_page1', 'CT 치료실 page1', 'CT 치료실 하단', 'sbt_smc_oph_0002', 'sbt_smc_oph_0002_page1', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0101_page1', '안과 검사실 대대합 page1', '안과 검사실 대대합 하단', 'sbt_smc_oph_0101', 'sbt_smc_oph_0101_page1', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0004_page1', '안과 검사실 1 page1', '안과 검사실 1 하단', 'sbt_smc_oph_0004', 'sbt_smc_oph_0004_page1', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_oph_0005_page1', '안과 검사실 2 page1', '안과 검사실 2 하단', 'sbt_smc_oph_0005', 'sbt_smc_oph_0005_page1', '2018-04-17 17:59:04', '2018-04-17 17:59:04', 'admin01', 'admin01'),
	('sbt_smc_er_0001_page0', 'ER 전광판 1 page0', 'ER 전광판 1 메인', 'sbt_smc_er_0001', 'sbt_smc_er_0001_page0', '2018-06-26 15:34:58', '2018-06-26 15:34:58', 'admin01', 'admin01'),
	('sbt_smc_lab_0001_page0', '심전도 검사실 1 page0', '심전도 검사실 1 메인', 'sbt_smc_lab_0001', 'sbt_smc_lab_0001_page0', '2018-10-28 08:39:26', '2018-10-28 21:25:33', 'admin01', 'admin01'),
	('sbt_smc_lab_0002_page0', '폐기능 검사실 1 page0', '폐기능 검사실 1 메인', 'sbt_smc_lab_0002', 'sbt_smc_lab_0002_page0', '2018-12-12 12:49:52', '2018-12-12 12:49:52', 'admin01', 'admin01'),
	('sbt_smc_der_0001_page0', '피부과 대대합 page0', '피부과 대대합 메인', 'sbt_smc_der_0001', 'sbt_smc_der_0001_page0', '2019-03-05 13:15:58', '2019-03-05 13:15:58', 'admin01', 'admin01'),
	('sbt_smc_hep_0001_page0', '심장전기생리학검사실 대대합 page0', '심장전기생리학검사실 대대합 메인', 'sbt_smc_hep_0001', 'sbt_smc_hep_0001_page0', '2019-05-29 14:07:48', '2019-05-29 14:07:48', 'admin01', 'admin01'),
	('sbt_smc_dim_0001_page0', '당뇨병센터 대대합 1 page0', '당뇨병센터 대대합 1 메인', 'sbt_smc_dim_0001', 'sbt_smc_dim_0001_page0', '2019-08-19 13:42:23', '2019-08-19 13:42:23', 'admin01', 'admin01'),
	('sbt_smc_dim_0002_page0', '당뇨병센터 대대합 2 page0', '당뇨병센터 대대합 2 메인', 'sbt_smc_dim_0002', 'sbt_smc_dim_0002_page0', '2019-08-19 13:42:49', '2019-08-19 13:42:49', 'admin01', 'admin01'),
	('sbt_smc_dim_0003_page0', '당뇨병센터 중대합 1 page0', '당뇨병센터 중대합 1 메인', 'sbt_smc_dim_0003', 'sbt_smc_dim_0003_page0', '2019-08-19 13:43:19', '2019-08-19 13:43:19', 'admin01', 'admin01'),
	('sbt_smc_dim_0004_page0', '당뇨병센터 중대합 2 page0', '당뇨병센터 중대합 2 메인', 'sbt_smc_dim_0004', 'sbt_smc_dim_0004_page0', '2019-08-19 13:43:28', '2019-08-19 13:43:28', 'admin01', 'admin01'),
	('sbt_smc_dim_0005_page0', '당뇨병센터 중대합 3 page0', '당뇨병센터 중대합 3 메인', 'sbt_smc_dim_0005', 'sbt_smc_dim_0005_page0', '2019-08-19 13:43:37', '2019-08-19 13:43:37', 'admin01', 'admin01'),
	('sbt_smc_dim_0006_page0', '당뇨병센터 중대합 4 page0', '당뇨병센터 중대합 4 메인', 'sbt_smc_dim_0006', 'sbt_smc_dim_0006_page0', '2019-08-19 13:43:47', '2019-08-19 13:43:47', 'admin01', 'admin01'),
	('sbt_smc_dim_0007_page0', '당뇨병센터 중대합 5 page0', '당뇨병센터 중대합 5 메인', 'sbt_smc_dim_0007', 'sbt_smc_dim_0007_page0', '2019-08-19 13:43:57', '2019-08-19 13:43:57', 'admin01', 'admin01');
/*!40000 ALTER TABLE `sboard_template_file` ENABLE KEYS */;

-- 테이블 sboard.sboard_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `sboard_user` (
  `id` varchar(8) NOT NULL COMMENT '사용자 ID',
  `name` varchar(32) DEFAULT NULL COMMENT '사용자 이름',
  `password` varchar(64) DEFAULT NULL COMMENT '사용자 비밀번호',
  `details` varchar(64) DEFAULT NULL COMMENT '설명',
  `level` varchar(1) DEFAULT NULL COMMENT '권한 (A : Administrator, D : Developer, U : User)',
  `access_template` varchar(1) DEFAULT NULL COMMENT '템플레이트 접근 권한 (R, W)',
  `access_model` varchar(1) DEFAULT NULL COMMENT '모델 접근 권한 (R, W)',
  `access_data` varchar(1) DEFAULT NULL COMMENT '사용자 접근 권한 (R, W)',
  `dept_id` varchar(6) DEFAULT NULL COMMENT '부서 ID',
  `dept_name` varchar(32) DEFAULT NULL COMMENT '부서 이름',
  `emp_type` varchar(8) DEFAULT NULL COMMENT '직종',
  `emp_charge` varchar(8) DEFAULT NULL COMMENT '직책',
  `emp_grade` varchar(8) DEFAULT NULL COMMENT '직급',
  `create_date` datetime DEFAULT current_timestamp() COMMENT '생성일시',
  `modify_date` datetime DEFAULT current_timestamp() COMMENT '수정일시',
  `create_id` varchar(8) DEFAULT NULL COMMENT '생성자 ID',
  `modify_id` varchar(8) DEFAULT NULL COMMENT '수정자 ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자';

-- 테이블 데이터 sboard.sboard_user:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `sboard_user` DISABLE KEYS */;
INSERT INTO `sboard_user` (`id`, `name`, `password`, `details`, `level`, `access_template`, `access_model`, `access_data`, `dept_id`, `dept_name`, `emp_type`, `emp_charge`, `emp_grade`, `create_date`, `modify_date`, `create_id`, `modify_id`) VALUES
	('admin01', '관리자1', '123456', '시스템 관리자', 'A', 'W', 'W', 'W', 'mobile', '모바일운영팀', '행정', '', '', '2018-04-17 18:02:00', '2018-04-17 18:02:00', 'admin01', 'admin01'),
	('SSZ017', '개발자1', '123456', '유지보수 담당자', 'D', 'W', 'W', 'W', 'mobile', '모바일운영팀', '행정', '', '', '2018-04-17 18:02:00', '2018-04-17 18:02:00', 'admin01', 'admin01'),
	('101010', '개발자2', '123456', '사용자 테스트용 1', 'U', 'W', 'W', 'W', 'infom', '정보전략팀', '행정', '', '사원', '2018-04-17 18:04:23', '2018-04-17 18:04:23', 'admin01', 'admin01'),
	('202020', '개발자3', '123456', '사용자 테스트용 2', 'U', 'R', 'R', 'W', 'infom', '정보전략팀', '행정', '', '사원', '2018-04-17 18:04:23', '2018-04-17 18:04:23', 'admin01', 'admin01'),
	('303030', '사용자1', '123456', '사용자 테스트용 3', 'U', 'W', 'R', 'W', 'oph', '안과', '안과', '', '', '2018-04-17 18:07:05', '2018-04-17 18:07:05', 'admin01', 'admin01');
/*!40000 ALTER TABLE `sboard_user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
