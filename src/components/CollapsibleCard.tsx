import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const CollapsibleCard = ({
  title,
  isAutomaticallyExpanded,
  children,
}: {
  title: string;
  isAutomaticallyExpanded: boolean;
  children: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(isAutomaticallyExpanded);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ marginBottom: 40 }}>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          {title.toUpperCase()}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Card>
  );
};

export default CollapsibleCard;
