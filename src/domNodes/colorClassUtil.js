import { Color } from '../util/colorUtil';

const getClassByColorType = (colorType) => {
  switch (colorType) {
    case Color.BLUE: {
      return 'text-primary';
    }
    case Color.GREEN: {
      return 'text-success';
    }
    case Color.RED: {
      return 'text-danger';
    }
    case Color.YELLOW: {
      return 'text-warning';
    }
    case Color.BLACK: {
      return 'text-dark';
    }
    default: {
      throw new Error('Color not found');
    }
  }
};

export default getClassByColorType;
