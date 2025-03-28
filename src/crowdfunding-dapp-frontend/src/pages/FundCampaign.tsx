import React, { useEffect, useState } from "react";
import { get_campaigns, fund_campaign } from "../utils/actor";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
}

const FundCampaign = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
        try {
          const data = (await get_campaigns()) as Campaign[]; // Type assertion
          setCampaigns(data);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
        }
      };
      

    fetchCampaigns();
  }, []);

  return (
    <div className="container">
      <h2>Fund a Campaign</h2>
      {campaigns.map((campaign) => (
        <div key={campaign.id}>
          <h3>{campaign.title}</h3>
          <p>{campaign.description}</p>
          <p>Goal: {campaign.goal} ICP</p>
          <button onClick={() => fund_campaign(campaign.id, 1)}>Fund 1 ICP</button>
        </div>
      ))}
    </div>
  );
};

export default FundCampaign;
