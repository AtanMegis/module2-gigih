import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Buttons } from '../Button/Button';
import msToTime from '../../lib/msToTime';




// export default function TrackWrapper({ imageUrl, title, artist, select, toggleSelect }) {
//   const [isSelected, setIsSelected] = useState(select);

//   const handleToggleSelect = () => {
//     setIsSelected(!isSelected);
//     toggleSelect();
//   }

export default function TrackWrapper({ imageUrl, title, artist, select, toggleSelect, duration }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }
  return (
    <div className="card">
    <div className="card__image" data-testid="SearchTrackwrapper">
      <img width={'100%'} src={imageUrl} alt={title} />
    </div>

    <div className="card__data">
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__artist">{artist}</p>
        <p className='card__duration'>{msToTime(duration)} </p>
      </div>
      
      <div className="card__action">
        <Buttons
          variant={isSelected ? 'primary' : 'secondary'}
          onClick={handleToggleSelect}
        >
          {isSelected ? 'Deselect' : 'Select'}
        </Buttons>
      </div>
    </div>
  </div>
);
}
  //    <Box sx={{ flexGrow: 1 }}>
  //     <Grid container spacing={1}>
  //       <Grid src={imageUrl} alt={title} container item spacing={2}>
  //         <TrackWrapper />
  //       </Grid>
  //       <Grid src={imageUrl} alt={title} container item spacing={2}>
  //         <TrackWrapper />
  //       </Grid>
  //       <Grid src={imageUrl} alt={title} container item spacing={2}>
  //         <TrackWrapper />
  //       </Grid>
  //     </Grid>
  //     <Button
  //           variant={isSelected ? 'primary' : 'secondary'}
  //           onClick={handleToggleSelect}
  //         >
  //           {isSelected ? 'Deselect' : 'Select'}
  //         </Button>
  //   </Box>
  // );
  

TrackWrapper.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  select: PropTypes.bool.isRequired,
};
