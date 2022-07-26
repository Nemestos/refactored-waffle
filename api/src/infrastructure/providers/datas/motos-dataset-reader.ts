import { MotoCategory } from '~/domain/enums/moto-category'
import * as path from 'path'
import * as fs from 'fs'
import { parse, Parser } from 'csv-parse'
import { logger } from '~/utils/logger'
export interface MotoDataset {
  company_name?: string
  model?: string
  price?: string
  status?: string
  body_type?: MotoCategory
  fuel_type?: string
  engine_desc?: string
  fuel_system?: string
  cooling?: string
  displacement?: string
  max_power?: string
  max_torque?: string
  cylinders_count?: string
  overall_lenght?: string
  overall_width?: string
  overall_height?: string
  seat_height?: string
  ground_clearance?: string
  wheelbase?: string
  kerb_wet?: string
  fuel_tank?: string
  bore?: string
  stroke?: string
  gears_count?: string
  clutch?: string
  gearbox?: string
  front_brake?: string
  rear_brake?: string
  front_suspension?: string
  rear_suspension?: string
  zero_cent?: string
  speedometer?: string
  tachometer?: string
  trip_meter?: string
  clock?: string
  electric_start?: string
}

export async function getMotos(): Promise<MotoDataset[]> {
  const csvFilePath = path.resolve(__dirname, 'bikes.csv')
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath).pipe(
      parse({ columns: true }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data as MotoDataset[])
        }
      })
    )
  })
}
