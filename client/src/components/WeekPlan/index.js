import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import useWeeklyPlanData from '../../hooks/useWeeklyPlanData';
import myWeekIcon from '../images//myweek.png'

export default function WeekPlan() {

  const { plan, removeMeal } = useWeeklyPlanData();

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <>
      <header class="mainPageHeaders"><img className="headerIcon" src={myWeekIcon} />My Week</header>
      <Stack>
        {daysOfWeek.map((day) => {
          return (
            <DayMeals
              key={day}
              meals={plan[day] ? plan[day] : {}}
              dayOfWeek={day}
              removeMeal={removeMeal}
            />
          )
        })}
      </Stack>
    </>
  );
};