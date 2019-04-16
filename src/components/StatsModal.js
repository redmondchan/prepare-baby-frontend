import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import Stats from './Stats'
import PieStats from './PieStats'
import PieStatsFood from './PieStatsFood'
import PieStatsDiaper from './PieStatsDiaper'
import PieStatsCost from './PieStatsCost'
import PieStatsScenario from './PieStatsScenario'

const StatsModal = (props) => (
  <Modal open='false' closeIcon size="large">
    <Modal.Content className="pie-container-left">
      <PieStatsDiaper />
      <PieStatsScenario />
    </Modal.Content>
    <Modal.Content className="pie-container-right">
      <PieStatsFood />
      <PieStatsCost />
    </Modal.Content>
  </Modal>
)

export default StatsModal
