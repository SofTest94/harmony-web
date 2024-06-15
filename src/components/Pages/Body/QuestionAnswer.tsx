import React from 'react';
import '../../styles/Body/QuestionAnswer.scss';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import DoneIcon from '@mui/icons-material/Done';
// import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
// import EastIcon from '@mui/icons-material/East';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import CampaignIcon from '@mui/icons-material/Campaign';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import FindReplaceOutlinedIcon from '@mui/icons-material/FindReplaceOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';


import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
interface QuestionAnswerProps {
  question: string;
  answer: string;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ question, answer }) => {
  return (
    <div className="qna-container">
      <div className="qna-question">
        <strong>{question}</strong>
      </div>
      <div className="qna-answer">
      {answer === "" ? (
          <>
            <UpdateOutlinedIcon style={{ fontSize: '1.5vw' }} /> Pendiente de responder...
          </>
        ) : (
          <>
            <KeyboardArrowRightIcon style={{ fontSize: '2vw' }} />
            {answer}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionAnswer;
