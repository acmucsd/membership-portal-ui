import React from 'react';
import PageLayout from '../components/PageLayout';
import TopLeaderCard from '../components/TopLeaderCard';

const LeaderPage = () => {
  return <PageLayout>
    <div className="top-leaderboard">
    <TopLeaderCard
      placement={1}
      name={"Joe Politz"}
      rank={"Linear Lemur"}
      exp={280}
      imageSrc={"https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/420.jpg"}
    ></TopLeaderCard>

<TopLeaderCard
      placement={2}
      name={"Ronak Shah"}
      rank={"Python Charmer"}
      exp={260}
      imageSrc={"https://avatars1.githubusercontent.com/u/9388431?s=400&v=4"}
    ></TopLeaderCard>


<TopLeaderCard
      placement={3}
      name={"Emily Nguyen"}
      rank={"Javascript Jester"}
      exp={220}
      imageSrc={"https://avatars3.githubusercontent.com/u/32719891?s=460&v=4"}
    ></TopLeaderCard>
</div>
    </PageLayout>;
};

export default LeaderPage;
