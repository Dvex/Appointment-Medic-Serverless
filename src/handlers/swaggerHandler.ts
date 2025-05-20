import { APIGatewayProxyHandler } from 'aws-lambda'
import path from 'path'
import fs from 'fs'

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const basePath = event.requestContext?.path?.split('/')[1] || 'dev'
    const swaggerJsonUrl = `/${basePath}/swagger.json`
    const htmlPath = path.join(__dirname, '../../static/swagger/index.html')
    const html = fs.readFileSync(htmlPath, 'utf8')

    const modifiedHtml = html.replace(
      'https://petstore.swagger.io/v2/swagger.json',
      swaggerJsonUrl
    )

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: modifiedHtml
    }
  } catch (error) {
    console.error('Error loading Swagger UI:', error)
    return {
      statusCode: 500,
      body: 'Failed to load Swagger UI'
    }
  }
}
