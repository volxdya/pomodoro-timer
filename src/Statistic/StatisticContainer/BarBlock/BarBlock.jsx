import { Bar } from 'react-chartjs-2';
import { options } from '../../Statistic.jsx';
import { data } from '../../Statistic.jsx';

export function BarBlock() {
  return (
    <div className="col-9">
      <Bar options={options} data={data} />
    </div>
  );
}
