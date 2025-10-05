'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Select, SelectTrigger, SelectContent, SelectItem, SelectValue, Button, Badge } from '@/components/ui';
import { PlayCircle, Video, Gauge, Clock, BarChart3, ThumbsUp, MessageSquare, Share, Eye, Calendar, Filter } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface VideoMetricPoint {
  date: string;
  views: number;
  watchTime: number; // minutos
  avgViewDuration: number; // segundos
  ctr: number; // %
  retention: number; // %
  likes: number;
  comments: number;
  shares: number;
}

interface VideoItem {
  id: string;
  title: string;
  platform: 'YouTube' | 'Instagram' | 'TikTok' | 'Facebook';
  views: number;
  watchTime: number;
  avgViewDuration: number;
  ctr: number;
  retention: number;
  likes: number;
  comments: number;
  shares: number;
}

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6'];

export default function VideoMarketingPage() {
  const [period, setPeriod] = useState('30d');
  const [platform, setPlatform] = useState<string | undefined>('YouTube');

  const series: VideoMetricPoint[] = useMemo(
    () => [
      { date: '2024-01-01', views: 12500, watchTime: 3400, avgViewDuration: 89, ctr: 3.2, retention: 45, likes: 820, comments: 150, shares: 95 },
      { date: '2024-01-02', views: 13200, watchTime: 3600, avgViewDuration: 92, ctr: 3.1, retention: 47, likes: 910, comments: 160, shares: 110 },
      { date: '2024-01-03', views: 11800, watchTime: 3100, avgViewDuration: 85, ctr: 3.0, retention: 42, likes: 780, comments: 140, shares: 88 },
      { date: '2024-01-04', views: 14100, watchTime: 3950, avgViewDuration: 94, ctr: 3.5, retention: 49, likes: 980, comments: 175, shares: 120 },
      { date: '2024-01-05', views: 13800, watchTime: 3820, avgViewDuration: 93, ctr: 3.3, retention: 48, likes: 940, comments: 168, shares: 115 },
      { date: '2024-01-06', views: 12900, watchTime: 3550, avgViewDuration: 90, ctr: 3.2, retention: 46, likes: 860, comments: 155, shares: 102 },
      { date: '2024-01-07', views: 15200, watchTime: 4200, avgViewDuration: 98, ctr: 3.7, retention: 51, likes: 1030, comments: 190, shares: 130 },
    ],
    []
  );

  const videos: VideoItem[] = [
    { id: 'v1', title: 'Como melhorar seu SEO em 2024', platform: 'YouTube', views: 12500, watchTime: 3400, avgViewDuration: 89, ctr: 3.2, retention: 45, likes: 820, comments: 150, shares: 95 },
    { id: 'v2', title: 'Estratégias de Ads que funcionam', platform: 'YouTube', views: 9800, watchTime: 2800, avgViewDuration: 82, ctr: 2.9, retention: 41, likes: 650, comments: 120, shares: 80 },
    { id: 'v3', title: 'Dicas rápidas de Analytics', platform: 'Instagram', views: 15200, watchTime: 2100, avgViewDuration: 48, ctr: 4.2, retention: 38, likes: 1470, comments: 220, shares: 300 },
    { id: 'v4', title: 'Top 5 erros em campanhas', platform: 'TikTok', views: 18900, watchTime: 2400, avgViewDuration: 42, ctr: 5.0, retention: 35, likes: 2100, comments: 310, shares: 420 },
    { id: 'v5', title: 'Como criar funis de vendas', platform: 'Facebook', views: 7200, watchTime: 1650, avgViewDuration: 76, ctr: 2.6, retention: 40, likes: 430, comments: 90, shares: 55 },
  ];

  const platforms = ['YouTube', 'Instagram', 'TikTok', 'Facebook'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2"><Video className="h-6 w-6" /> Video Marketing</h1>
          <p className="text-sm text-gray-600">Análise de vídeos, retenção, CTR e engajamento por plataforma.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Últimos {period}</Badge>
          <Button variant="outline" className="flex items-center gap-1"><Filter className="h-4 w-4" /> Filtros</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Visão Geral</CardTitle>
          <CardDescription>Performance agregada por plataforma e período.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-md border p-4">
              <div className="text-sm text-gray-500">Visualizações</div>
              <div className="text-2xl font-semibold flex items-center gap-2"><Eye className="h-5 w-5" /> 73.200</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-gray-500">Tempo de exibição</div>
              <div className="text-2xl font-semibold flex items-center gap-2"><Clock className="h-5 w-5" /> 19.600 min</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-gray-500">CTR médio</div>
              <div className="text-2xl font-semibold flex items-center gap-2"><Gauge className="h-5 w-5" /> 3,4%</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><PlayCircle className="h-5 w-5" /> Evolução de visualizações</CardTitle>
                <CardDescription>Variação diária de visualizações e CTR.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={series}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke={COLORS[0]} name="Views" strokeWidth={2} />
                      <Line type="monotone" dataKey="ctr" stroke={COLORS[2]} name="CTR (%)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Retenção e duração média</CardTitle>
                <CardDescription>Retenção (%) e duração média das views.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="retention" fill={COLORS[1]} name="Retenção (%)" />
                      <Bar dataKey="avgViewDuration" fill={COLORS[4]} name="Duração média (s)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Video className="h-5 w-5" /> Performance por plataforma</CardTitle>
          <CardDescription>Compare métricas chave entre YouTube, Instagram, TikTok e Facebook.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((p, i) => (
              <div key={p} className="rounded-md border p-4">
                <div className="text-sm text-gray-500">{p}</div>
                <div className="mt-2 flex items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1"><Eye className="h-4 w-4" /> {Math.round(18000 + i * 2500)}</Badge>
                  <Badge variant="secondary" className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {Math.round(750 + i * 140)}</Badge>
                  <Badge variant="secondary" className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {Math.round(120 + i * 40)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Top vídeos</CardTitle>
          <CardDescription>Ranking por visualizações e engajamento.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Título</th>
                  <th className="py-2">Plataforma</th>
                  <th className="py-2">Views</th>
                  <th className="py-2">Watch time (min)</th>
                  <th className="py-2">CTR</th>
                  <th className="py-2">Retenção</th>
                  <th className="py-2">Likes</th>
                  <th className="py-2">Comentários</th>
                  <th className="py-2">Compart.</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((v) => (
                  <tr key={v.id} className="border-b">
                    <td className="py-2">{v.title}</td>
                    <td className="py-2">{v.platform}</td>
                    <td className="py-2">{v.views.toLocaleString()}</td>
                    <td className="py-2">{v.watchTime.toLocaleString()}</td>
                    <td className="py-2">{v.ctr}%</td>
                    <td className="py-2">{v.retention}%</td>
                    <td className="py-2">{v.likes}</td>
                    <td className="py-2">{v.comments}</td>
                    <td className="py-2">{v.shares}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" /> Filtros e seleção</CardTitle>
          <CardDescription>Selecione plataforma e período para refinar os gráficos.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Plataforma</div>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha plataforma" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Período</div>
              <Tabs value={period} onValueChange={setPeriod}>
                <TabsList>
                  <TabsTrigger value="7d">7 dias</TabsTrigger>
                  <TabsTrigger value="30d">30 dias</TabsTrigger>
                  <TabsTrigger value="90d">90 dias</TabsTrigger>
                </TabsList>
                <TabsContent value="7d" />
                <TabsContent value="30d" />
                <TabsContent value="90d" />
              </Tabs>
            </div>
            <div className="flex items-end">
              <Button className="w-full" variant="default">Aplicar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}