import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  premium: boolean;
}

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['usa-ny', 'uk-london']);
  const [downloadSpeed] = useState(0);
  const [uploadSpeed] = useState(0);
  const [connectionTime] = useState(0);

  const servers: Server[] = [
    { id: 'usa-ny', country: 'США', city: 'Нью-Йорк', flag: '🇺🇸', ping: 45, load: 32, premium: false },
    { id: 'uk-london', country: 'Великобритания', city: 'Лондон', flag: '🇬🇧', ping: 67, load: 45, premium: false },
    { id: 'de-berlin', country: 'Германия', city: 'Берлин', flag: '🇩🇪', ping: 52, load: 28, premium: false },
    { id: 'jp-tokyo', country: 'Япония', city: 'Токио', flag: '🇯🇵', ping: 123, load: 67, premium: true },
    { id: 'sg-singapore', country: 'Сингапур', city: 'Сингапур', flag: '🇸🇬', ping: 98, load: 54, premium: true },
    { id: 'nl-amsterdam', country: 'Нидерланды', city: 'Амстердам', flag: '🇳🇱', ping: 58, load: 38, premium: false },
    { id: 'fr-paris', country: 'Франция', city: 'Париж', flag: '🇫🇷', ping: 61, load: 41, premium: false },
    { id: 'ca-toronto', country: 'Канада', city: 'Торонто', flag: '🇨🇦', ping: 78, load: 49, premium: false },
  ];

  const handleConnect = () => {
    if (connectionStatus === 'disconnected') {
      setConnectionStatus('connecting');
      setTimeout(() => {
        setConnectionStatus('connected');
        if (!selectedServer) {
          setSelectedServer(servers[0]);
        }
      }, 2000);
    } else {
      setConnectionStatus('disconnected');
    }
  };

  const toggleFavorite = (serverId: string) => {
    setFavorites(prev =>
      prev.includes(serverId) ? prev.filter(id => id !== serverId) : [...prev, serverId]
    );
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'from-green-500 to-emerald-600';
      case 'connecting':
        return 'from-yellow-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Защищено';
      case 'connecting':
        return 'Подключение...';
      default:
        return 'Не защищено';
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const ServerCard = ({ server }: { server: Server }) => {
    const isFavorite = favorites.includes(server.id);
    const isSelected = selectedServer?.id === server.id;

    return (
      <Card
        className={`p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl bg-card/50 border-2 ${
          isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'
        }`}
        onClick={() => setSelectedServer(server)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{server.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{server.country}</h3>
                {server.premium && (
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
                    PRO
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{server.city}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm">
                <Icon name="Activity" size={14} className="text-accent" />
                <span>{server.ping}ms</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="Server" size={12} />
                <span>{server.load}%</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(server.id);
              }}
            >
              <Icon
                name="Star"
                size={20}
                className={isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}
              />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-6xl mx-auto p-6 space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                SecureVPN
              </h1>
              <p className="text-xs text-muted-foreground">Ваша защита онлайн</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="Settings" size={24} />
          </Button>
        </header>

        <Card className="p-8 backdrop-blur-xl bg-card/50 border-2 border-primary/20">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div
                className={`w-40 h-40 rounded-full bg-gradient-to-br ${getStatusColor()} flex items-center justify-center shadow-2xl ${
                  connectionStatus === 'connected' ? 'pulse-glow' : ''
                } ${connectionStatus === 'connecting' ? 'animate-pulse' : ''}`}
              >
                <Icon
                  name={connectionStatus === 'connected' ? 'ShieldCheck' : 'Shield'}
                  size={64}
                  className="text-white"
                />
              </div>
              {connectionStatus === 'connected' && (
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Icon name="Check" size={24} className="text-white" />
                </div>
              )}
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">{getStatusText()}</h2>
              {selectedServer && connectionStatus === 'connected' && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <span className="text-2xl">{selectedServer.flag}</span>
                  <span>{selectedServer.country}</span>
                </div>
              )}
            </div>

            <Button
              size="lg"
              onClick={handleConnect}
              className={`w-full max-w-xs h-14 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 ${
                connectionStatus === 'connected'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                  : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
              }`}
            >
              {connectionStatus === 'connected' ? 'Отключиться' : 'Подключиться'}
            </Button>
          </div>
        </Card>

        {connectionStatus === 'connected' && (
          <Card className="p-6 backdrop-blur-xl bg-card/50 border-2 border-primary/20 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-accent">
                  <Icon name="ArrowDown" size={20} />
                  <span className="text-2xl font-bold">{downloadSpeed}</span>
                  <span className="text-sm">Мбит/с</span>
                </div>
                <p className="text-xs text-muted-foreground">Загрузка</p>
              </div>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-accent">
                  <Icon name="ArrowUp" size={20} />
                  <span className="text-2xl font-bold">{uploadSpeed}</span>
                  <span className="text-sm">Мбит/с</span>
                </div>
                <p className="text-xs text-muted-foreground">Выгрузка</p>
              </div>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-accent">
                  <Icon name="Clock" size={20} />
                  <span className="text-2xl font-bold">{formatTime(connectionTime)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Время подключения</p>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-card/50 backdrop-blur-xl">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary">
              Все серверы
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-primary">
              Избранное
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {servers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-3">
            {servers
              .filter((server) => favorites.includes(server.id))
              .map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            {favorites.length === 0 && (
              <Card className="p-12 text-center backdrop-blur-xl bg-card/50">
                <Icon name="Star" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Нет избранных серверов</h3>
                <p className="text-muted-foreground">
                  Добавьте серверы в избранное для быстрого доступа
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
