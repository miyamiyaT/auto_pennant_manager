import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlayerRegistrationForm from './features/player_registration_form/player_registration_form'
import PlayerRegistrationEditForm from './features/player_registration_edit_form/player_registration_form';
import TeamList from './features/team_list/team_list';
import TeamDetail from './features/team_detail/team_detail';
import BatterSeasonList from './features/batter_season_list/batter_season_list';
import PitcherSeasonList from './features/pitcher_season_list/pitcher_season_list';
import BatterDetails from './features/batter_detail/batter_detail';
import PitcherDetails from './features/pitcher_detail/pitcher_detail';
import BatterSeasonRegistrationForm from './features/batter_season_registration_form/batter_season_registration_form';
import PitcherSeasonRegistrationForm from './features/pitcher_season_registration_form/pitcher_season_registration_form'
import Header from './features/header/header';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/team-list" element={<TeamList />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/player-registration-form/:id" element={<PlayerRegistrationForm />} />
          <Route path="/player-registration-form/:id/edit" element={<PlayerRegistrationEditForm />} />
          <Route path="/batter-season-list/:id" element={<BatterSeasonList />} />
          <Route path="/pitcher-season-list/:id" element={<PitcherSeasonList />} />
          <Route path="/batter/:id" element={<BatterDetails />} />
          <Route path="/pitcher/:id" element={<PitcherDetails />} />
          <Route path="/batter-season-registration-form/:id" element={<BatterSeasonRegistrationForm />} />
          <Route path="/pitcher-season-registration-form/:id" element={<PitcherSeasonRegistrationForm />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
