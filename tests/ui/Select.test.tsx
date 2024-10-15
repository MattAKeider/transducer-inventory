import { render, screen } from'@testing-library/react';

import Select from '../../src/ui/Select/Select';
import { Location } from '../../src/models/model';

describe('Select', () => {
  test('should render Select component', () => {
    const locations: Location[] = ['CROCKER', 'MIDTOWN', 'RISMAN'];

    render(<Select label="Location:" name="location" value="" className={null} onChange={vi.fn()} options={locations} />);

    const select = screen.getByRole('combobox');
    
    expect(select).toBeInTheDocument();

    locations.forEach(location => {
      const option = screen.getByRole('option', {name: location});
      expect(option).toBeInTheDocument();
    });
  });
});