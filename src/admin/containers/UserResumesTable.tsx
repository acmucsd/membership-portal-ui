import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import UserResumeTable from '../components/UserResumeTable';
import { getAllVisibleResumes as getAllVisibleResumesConnect } from '../adminActions';
import { UserResume } from '../../types';

interface UserResumesTableContainerProps {
  resumes: UserResume[];
  getAllVisibleResumes: Function;
}

const mockResumes = [
  {
    uuid: '1c8d82eb-0903-4c5d-bbd5-a99ca62044ce',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/1a1bbe9d-8cf9-40e4-b98b-f70c9484b3cc/Aryadeepta%20De%20Resume%20%28Short%29.pdf',
    lastUpdated: '2023-02-13T04:13:21.237Z',
    user: {
      uuid: '1a1bbe9d-8cf9-40e4-b98b-f70c9484b3cc',
      handle: 'aryadeepta-de-66b586',
      firstName: 'Aryadeepta',
      lastName: 'De',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/1a1bbe9d-8cf9-40e4-b98b-f70c9484b3cc.jpg',
      graduationYear: 2025,
      major: 'Mathematics-Computer Science',
      bio: '',
      points: 10,
    },
  },
  {
    uuid: '2bdc7eae-230f-4686-82fa-549277b345b4',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/904eafd5-4389-4d2d-bd67-5ed2034e1c31/Andy_Resume_Jan2023.pdf',
    lastUpdated: '2023-02-11T00:26:28.722Z',
    user: {
      uuid: '904eafd5-4389-4d2d-bd67-5ed2034e1c31',
      handle: 'andrew-smithwick-3e9d34',
      firstName: 'Andrew',
      lastName: 'Smithwick',
      profilePicture: null,
      graduationYear: 2026,
      major: 'Computer Science',
      bio: null,
      points: 555,
    },
  },
  {
    uuid: '3d988f9a-52cc-4731-8c6b-fee2235e0e44',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/cf6ca1b7-cd3b-4da5-8d2b-28ea55084a06/ResumeWinter2023V1.1.pdf',
    lastUpdated: '2023-02-11T00:26:45.235Z',
    user: {
      uuid: 'cf6ca1b7-cd3b-4da5-8d2b-28ea55084a06',
      handle: 'marcelo-shen-b0707d',
      firstName: 'Marcelo',
      lastName: 'Shen',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/cf6ca1b7-cd3b-4da5-8d2b-28ea55084a06.png',
      graduationYear: 2025,
      major: 'Computer Engineering',
      bio: 'Dev',
      points: 2015,
    },
  },
  {
    uuid: '3e77f1c4-2b93-46ef-9179-5443b09557e7',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/73c8fd60-4ab0-4f5e-bb91-03efdad87310/Sidhant%20Rohatgi%20Resume.pdf',
    lastUpdated: '2023-02-13T09:56:59.188Z',
    user: {
      uuid: '73c8fd60-4ab0-4f5e-bb91-03efdad87310',
      handle: 'sidhant-rohatgi-62456b',
      firstName: 'Sidhant',
      lastName: 'Rohatgi',
      profilePicture: null,
      graduationYear: 2026,
      major: 'Mathematics-Computer Science',
      bio: null,
      points: 80,
    },
  },
  {
    uuid: '6e9a1f63-b515-4926-b45f-5305be3026c2',
    isResumeVisible: true,
    url:
      'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/d706e149-96bd-4967-b71f-fe5c3f90793b/Kristin%20Ebuengan%20Resume%20%282023%29.pdf.pdf',
    lastUpdated: '2023-02-15T01:21:19.950Z',
    user: {
      uuid: 'd706e149-96bd-4967-b71f-fe5c3f90793b',
      handle: 'kristin-ebuengan-abe426',
      firstName: 'Kristin',
      lastName: 'Ebuengan',
      profilePicture: null,
      graduationYear: 2025,
      major: 'Computer Science',
      bio: null,
      points: 95,
    },
  },
  {
    uuid: '92a4a437-1a8b-47e8-a474-7849ab2628a7',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/07789a16-8326-4edc-ad2d-fc6193cd1ee3/Nishant_Balaji_Resume.pdf',
    lastUpdated: '2023-02-15T18:45:10.603Z',
    user: {
      uuid: '07789a16-8326-4edc-ad2d-fc6193cd1ee3',
      handle: 'nishant-balaji-e84ed0',
      firstName: 'Nishant',
      lastName: 'Balaji',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/07789a16-8326-4edc-ad2d-fc6193cd1ee3.jpg',
      graduationYear: 2024,
      major: 'Computer Engineering',
      bio: 'so. much. paperwork',
      points: 2660,
    },
  },
  {
    uuid: 'd205ab84-118b-458d-b863-0dd3b6b1fbb0',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/287b6fc8-7cb5-4f48-a19f-7979561c4469/Raymond.Sun.Resume.1-24-23.pdf',
    lastUpdated: '2023-02-11T00:29:26.791Z',
    user: {
      uuid: '287b6fc8-7cb5-4f48-a19f-7979561c4469',
      handle: 'raymond-sun-af655e',
      firstName: 'Raymond',
      lastName: 'Sun',
      profilePicture: null,
      graduationYear: 2025,
      major: 'Computer Science',
      bio: null,
      points: 540,
    },
  },
  {
    uuid: 'a09f9faa-47dd-48d3-908c-123c91e45af4',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/4aa4478e-c802-40cb-83ad-50e4fc91e9b5/Resume_Yiyi_Huang.pdf',
    lastUpdated: '2023-02-17T04:00:00.096Z',
    user: {
      uuid: '4aa4478e-c802-40cb-83ad-50e4fc91e9b5',
      handle: 'yiyi-huang-db0ca6',
      firstName: 'Yiyi',
      lastName: 'Huang',
      profilePicture: null,
      graduationYear: 2025,
      major: 'Mathematics-Computer Science',
      bio: null,
      points: 25,
    },
  },
  {
    uuid: '12f2cc08-6d9d-4506-b758-5aafa376c7bd',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/c65540af-57d4-43d0-92d1-30e48423f48d/Vivian%20Liu%20Resume.pdf',
    lastUpdated: '2023-02-23T00:14:56.118Z',
    user: {
      uuid: 'c65540af-57d4-43d0-92d1-30e48423f48d',
      handle: 'vivian-liu-8e31ea',
      firstName: 'Vivian',
      lastName: 'Liu',
      profilePicture: null,
      graduationYear: 2026,
      major: 'Computer Science',
      bio: null,
      points: 370,
    },
  },
  {
    uuid: '522da1f2-2663-49ec-a05d-74cf75bedcad',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/240de4bc-5f23-41e5-8b57-33f623820b80/Computer%20Science%20Resume.pdf',
    lastUpdated: '2023-04-03T23:12:31.251Z',
    user: {
      uuid: '240de4bc-5f23-41e5-8b57-33f623820b80',
      handle: 'newton-chung-11e1d7',
      firstName: 'Newton',
      lastName: 'Chung',
      profilePicture: null,
      graduationYear: 2025,
      major: 'Mathematics-Computer Science',
      bio: null,
      points: 65,
    },
  },
  {
    uuid: 'd7b4571a-7fa5-4e8c-81b8-e5fbb4b9f5c8',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/0b05f14f-2b5c-45cb-bdc3-36c48d84913f/Resume.pdf',
    lastUpdated: '2023-04-07T17:38:29.923Z',
    user: {
      uuid: '0b05f14f-2b5c-45cb-bdc3-36c48d84913f',
      handle: 'jae-lee-8acf6b',
      firstName: 'Jae',
      lastName: 'Lee',
      profilePicture: null,
      graduationYear: 2023,
      major: 'Mathematics-Computer Science',
      bio: null,
      points: 25,
    },
  },
  {
    uuid: 'fc8b98bb-2adb-411f-bfe0-96b2acf28e7e',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/ba6d4750-4d0b-447d-9cbe-103f5f02d456/General%20-%20Janzen%20Molina%20Resume.pdf',
    lastUpdated: '2023-02-11T00:27:39.620Z',
    user: {
      uuid: 'ba6d4750-4d0b-447d-9cbe-103f5f02d456',
      handle: 'janzen-molina-cdda09',
      firstName: 'Janzen',
      lastName: 'Molina',
      profilePicture: null,
      graduationYear: 2024,
      major: 'Cogn Sci w/Spec Design & Inter',
      bio: 'testing',
      points: 160,
    },
  },
  {
    uuid: '99c39236-76ec-46f5-96e4-0d6f5025cdc9',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/c049c017-6bea-40d2-9936-1d18501370de/Trevor%20SWE%20Resume.docx.pdf',
    lastUpdated: '2023-02-11T20:12:50.662Z',
    user: {
      uuid: 'c049c017-6bea-40d2-9936-1d18501370de',
      handle: 'trevor-kwan-6cea60',
      firstName: 'Trevor',
      lastName: 'Kwan',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/c049c017-6bea-40d2-9936-1d18501370de.gif',
      graduationYear: 2024,
      major: 'Mathematics-Computer Science',
      bio: '',
      points: 760,
    },
  },
  {
    uuid: '7d910fb7-da30-426c-b160-ffdb2062d24e',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/731fca02-e343-4b6a-8904-6910cabfc4f5/resume_andrew_schmtiz.pdf',
    lastUpdated: '2023-02-12T00:51:13.050Z',
    user: {
      uuid: '731fca02-e343-4b6a-8904-6910cabfc4f5',
      handle: 'andrew-schmitz-f7db23',
      firstName: 'Andrew',
      lastName: 'Schmitz',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/731fca02-e343-4b6a-8904-6910cabfc4f5.jfif',
      graduationYear: 2025,
      major: 'Data Science',
      bio: 'https://github.com/SchmitzAndrew',
      points: 95,
    },
  },
  {
    uuid: '20e90350-fb16-4f82-a9ea-e8ef43ae08b6',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/461c0ccf-4431-4d59-9592-068004a90e53/AnthonyManriqueResume-compressed.pdf',
    lastUpdated: '2023-02-12T00:53:08.586Z',
    user: {
      uuid: '461c0ccf-4431-4d59-9592-068004a90e53',
      handle: 'anthony-manrique-84ead1',
      firstName: 'Anthony',
      lastName: 'Manrique',
      profilePicture: null,
      graduationYear: 2024,
      major: 'Cognitive Science',
      bio: null,
      points: 810,
    },
  },
  {
    uuid: '1dc4e754-9621-47db-acb7-ef6356194ed5',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/633dcbfc-1396-49e4-a76e-0b620837678c/TonyMeng_Resume.pdf',
    lastUpdated: '2023-02-12T01:17:13.702Z',
    user: {
      uuid: '633dcbfc-1396-49e4-a76e-0b620837678c',
      handle: 'tony-meng-6bd73d',
      firstName: 'Tony',
      lastName: 'Meng',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/633dcbfc-1396-49e4-a76e-0b620837678c.JPG',
      graduationYear: 2024,
      major: 'Computer Science',
      bio:
        "Hello, I’m Tony Meng!\nI’m the Creative Director for Indie Studios, where I oversee all aspects of the design process. I launched the startup company with $75,000 in investments from Roblox, a multi-billion dollar corporation.\n\nPreviously, I was the Lead UX Designer for several studios. I have years of experience in the software industry, and my work has millions of users across multiple platforms. Additionally, I love software/game design and have hosted panels to discuss programming and UI/UX design techniques with hundreds of aspiring developers.\n\nPeople have always been at the heart of both my designs and my life. I always make sure that my work is easy for anyone to understand. I enjoy collaborating with teams to build innovative designs that create impact. When I'm not designing, you'll probably find me getting tea or developing / hanging out on online experiences.\n\nFeel free to check out my work and reach out on LinkedIn anytime!\nhttps://tonyqm.github.io/",
      points: 480,
    },
  },
  {
    uuid: 'da1b3a58-2a64-4fb7-8b70-9fa29f46c4c2',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/4d792a49-4c7b-403f-8282-108c911601e1/MikoBrownResume2022.pdf',
    lastUpdated: '2023-02-12T01:28:05.504Z',
    user: {
      uuid: '4d792a49-4c7b-403f-8282-108c911601e1',
      handle: 'miko-brown-91674f',
      firstName: 'Miko',
      lastName: 'Brown',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/4d792a49-4c7b-403f-8282-108c911601e1.jpg',
      graduationYear: 2024,
      major: 'Mathematics-Computer Science',
      bio:
        'Highly motivated student-athlete pursuing a major in mathematics and computer science. Dedicated to my teammates and doing what it takes to achieve my goals. Fascinated by the power of computer science to solve complex challenges, looking to apply my studies and work experience through a software development internship.',
      points: 280,
    },
  },
  {
    uuid: 'db26634f-a257-4911-a893-04429b810b41',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/daf32ceb-0380-48f5-a139-30dd6c4bb915/Hannah_Coates_Resume2023.pdf',
    lastUpdated: '2023-02-12T02:35:59.392Z',
    user: {
      uuid: 'daf32ceb-0380-48f5-a139-30dd6c4bb915',
      handle: 'hannah-coates-68f952',
      firstName: 'Hannah',
      lastName: 'Coates',
      profilePicture: null,
      graduationYear: 2026,
      major: 'Computer Science',
      bio: null,
      points: 210,
    },
  },
  {
    uuid: '243e84eb-122b-4672-9a03-1f8b5d870f33',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/20b5b6dd-362f-41c9-afb0-c4ac6532f755/Resume-AniketGupta.pdf',
    lastUpdated: '2023-02-12T06:41:19.615Z',
    user: {
      uuid: '20b5b6dd-362f-41c9-afb0-c4ac6532f755',
      handle: 'aniket-gupta-12854f',
      firstName: 'Aniket',
      lastName: 'Gupta',
      profilePicture: null,
      graduationYear: 2026,
      major: 'Computer Science',
      bio: null,
      points: 95,
    },
  },
  {
    uuid: 'c6b6d832-1a78-4f3e-aa55-c12a7cd1af90',
    isResumeVisible: true,
    url:
      'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/2bfc6a1d-f835-4a61-b374-b23312a203fd/Nicholas_Sean_Cheah_Ui_Lim_Resume_Dec2022.pdf',
    lastUpdated: '2023-02-12T12:17:08.299Z',
    user: {
      uuid: '2bfc6a1d-f835-4a61-b374-b23312a203fd',
      handle: 'nicholas ui lim-cheah-9d4d8c',
      firstName: 'Nicholas Ui Lim',
      lastName: 'Cheah',
      profilePicture: null,
      graduationYear: 2026,
      major: 'Mathematics-Computer Science',
      bio: null,
      points: 300,
    },
  },
  {
    uuid: '4eadd7ce-be4f-4485-9afc-a0f96493e235',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/66e1d070-eed0-4560-b4bb-40e00335058b/Cody-Winter-Career-Fair-Resume.pdf',
    lastUpdated: '2023-02-12T18:05:04.651Z',
    user: {
      uuid: '66e1d070-eed0-4560-b4bb-40e00335058b',
      handle: 'cody-rupp-1bb08b',
      firstName: 'Cody',
      lastName: 'Rupp',
      profilePicture: null,
      graduationYear: 2025,
      major: 'Computer Science',
      bio: null,
      points: 10,
    },
  },
  {
    uuid: '7fa074a4-adb0-4975-95b3-f27218e4cbc4',
    isResumeVisible: true,
    url:
      'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/759468e3-5a4c-44eb-aaf6-b5a069416598/Nihal%20Nazeem%20-%20Computer%20Engineering%20Resume.pdf',
    lastUpdated: '2023-02-12T19:20:50.811Z',
    user: {
      uuid: '759468e3-5a4c-44eb-aaf6-b5a069416598',
      handle: 'nihal-nazeem-b26def',
      firstName: 'Nihal',
      lastName: 'Nazeem',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/759468e3-5a4c-44eb-aaf6-b5a069416598.jpg',
      graduationYear: 2024,
      major: 'Computer Engineering',
      bio: null,
      points: 1095,
    },
  },
  {
    uuid: '5f3e1df6-30ad-4aa6-bc6b-9afcb44dc798',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/41ac502a-baa9-44f1-aca7-2c7fb7ecfd04/acmresume.pdf',
    lastUpdated: '2023-04-10T04:49:56.592Z',
    user: {
      uuid: '41ac502a-baa9-44f1-aca7-2c7fb7ecfd04',
      handle: 'brian-liu-023018',
      firstName: 'Brian',
      lastName: 'Liu',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/41ac502a-baa9-44f1-aca7-2c7fb7ecfd04.jpeg',
      graduationYear: 2026,
      major: 'Mathematics-Computer Science',
      bio: '',
      points: 155,
    },
  },
  {
    uuid: '7e8b6afe-df8a-46a5-9fac-eb2a72e25886',
    isResumeVisible: true,
    url: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/resumes/26d878bd-6c2a-4359-b6d2-0bd5b6e2c428/Samvrit_s_Resume%20%281%29.pdf',
    lastUpdated: '2023-04-24T00:44:07.499Z',
    user: {
      uuid: '26d878bd-6c2a-4359-b6d2-0bd5b6e2c428',
      handle: 'samvrit-srinath-3718ed',
      firstName: 'Samvrit',
      lastName: 'Srinath',
      profilePicture: 'https://acmucsd.s3.us-west-1.amazonaws.com/portal/profiles/26d878bd-6c2a-4359-b6d2-0bd5b6e2c428.jpg',
      graduationYear: 2026,
      major: 'Computer Science',
      bio: 'Trying to Survive. \nMercedes >>',
      points: 330,
    },
  },
];

const UserResumesTableContainer: React.FC<UserResumesTableContainerProps> = (props) => {
  const { resumes, getAllVisibleResumes } = props;

  useEffect(() => {
    getAllVisibleResumes();
  }, [getAllVisibleResumes]);

  return <UserResumeTable resumes={mockResumes} />;
};

const mapStateToProps = (state: { [key: string]: any }) => ({
  resumes: state.admin.resumes,
});

export default connect(mapStateToProps, { getAllVisibleResumes: getAllVisibleResumesConnect })(UserResumesTableContainer);
